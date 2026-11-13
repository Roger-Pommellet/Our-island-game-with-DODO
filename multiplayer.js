"use strict";
// ===================================================================
// multiplayer.js: the "together" connection layer.
// Loaded BEFORE game.js (see launcher.js). Everything here only runs when
// game.js calls it, so it can use game.js globals (db, uid, P, partner, ...).
// Contents: localDB (solo save store), mpConnect (solo vs together),
// peerSync (spawn/remove the partner character), mpBridge (live position + clock sync).
// Partner-flavoured game features (mail, hearts, question cards) stay in game.js.
// ===================================================================

function localDB() {
  const K = "island_v36";
  let S = {};
  try {
    S = JSON.parse(localStorage.getItem(K) || "{}");
  } catch (e) {
    S = {};
  }
  const _t = { x: 0 },
    subs = [],
    cl = (x) => JSON.parse(JSON.stringify(x)),
    save = () => {
      clearTimeout(_t.x);
      _t.x = setTimeout(() => {
        try {
          localStorage.setItem(K, JSON.stringify(S));
        } catch (e) {}
      }, 700);
    },
    notify = () => subs.forEach((f) => f());
  const mg = (a, b) => {
    for (const k in b) {
      if (
        b[k] &&
        typeof b[k] === "object" &&
        !Array.isArray(b[k]) &&
        a[k] &&
        typeof a[k] === "object"
      )
        mg(a[k], b[k]);
      else a[k] = b[k];
    }
  };
  const snap = (c) => ({
    docs: Object.keys(S)
      .filter((k) => k.startsWith(c + "/"))
      .map((k) => ({ id: k.slice(c.length + 1), data: () => cl(S[k]) })),
  });
  return {
    collection: (c) => ({
      onSnapshot: (f) => {
        const r = () => f(snap(c));
        subs.push(r);
        setTimeout(r, 0);
      },
    }),
    doc: (p) => ({
      get: async () => ({ exists: p in S, data: () => cl(S[p]) }),
      set: async (d) => {
        S[p] = cl(d);
        save();
        notify();
      },
      update: async (d) => {
        S[p] = S[p] || {};
        mg(S[p], cl(d));
        save();
        notify();
      },
      delete: async () => {
        delete S[p];
        save();
        notify();
      },
      onSnapshot: (f) => {
        const r = () => f({ exists: p in S, data: () => cl(S[p]) });
        subs.push(r);
        setTimeout(r, 0);
      },
    }),
  };
}

// Choose the database: local (solo) or the shared one from launcher.js (together).
function mpConnect() {
  if (!window.__MP) {
    db = localDB();
    uid = "local";
    offline = true;
    setTimeout(() => toast("Your island is saved on this device 💾"), 1500);
  } else {
    db = window.__MP.db;
    uid = window.__MP.uid;
  }
}

function peerSync() {
  const o = other();
  if (o && P[o] && P[o].x !== undefined && P[o].name) {
    if (!partner) {
      partner = actor(P[o].ci === undefined ? 1 : P[o].ci, P[o].name);
      partner.x = P[o].x;
      partner.z = P[o].z;
      partner.ry = P[o].ry || 0;
      partner.g.userData.who = partner;
    }
  } else if (partner && !o) {
    scene.remove(partner.g);
    partner = null;
  }
  hud();
}

async function mpBridge() {
  const M0 = window.__MP;
  if (!M0) return;
  try {
    let net = M0.net;
    if (!net) {
      const room = await claude.use("room");
      if (!room) return;
      net = {
        send: (o) => room.presence(o),
        on: (f) => {
          room.onPeers((ch) => {
            const o = ch.peers.find(
              (p) =>
                !p.isMe &&
                p.kind === "viewer" &&
                p.presence &&
                p.presence.x !== undefined,
            );
            f(o ? o.presence : null);
          });
        },
      };
    }
    let had = 0,
      pb = null;
    net.on((pr) => {
      const o = !!(pr && pr.x !== undefined);
      window.__rp = o ? { x: pr.x, z: pr.z, y: pr.y, ry: pr.ry } : null;
      window.__pp = pr;
      if (o && !had) {
        had = 1;
        if (ready) toast("💕 " + nm(other()) + " is on the island");
      } else if (!o && had) {
        had = 0;
        toast("👋 " + nm(other()) + " left");
      }
    });
    setInterval(() => {
      if (!ready) return;
      const off = new Date().getTimezoneOffset() * 6e4;
      net.send({
        u: uid,
        x: me3.x,
        z: me3.z,
        y: me3.y,
        ry: me3.ry,
        sl: sailing ? 1 : 0,
        bh: BO.h,
        tl: now() + timeOff - off,
      });
      const pp = window.__pp;
      if (partner && partner.g) partner.g.visible = !!window.__rp;
      if (pp && pp.u && pp.u !== uid && window.__rp) {
        if (uid > pp.u && pp.tl && !window.__cmT) {
          const want = pp.tl + off - now();
          if (Math.abs(want - timeOff) > 3000) timeOff = want;
        }
        if (!pb && boatItem && boatItem.root) {
          pb = boatItem.root.clone(true);
          scene.add(pb);
        }
        if (pb) {
          pb.visible = !!pp.sl;
          if (pp.sl) {
            pb.position.set(pp.x, SEA - 0.12, pp.z);
            pb.rotation.set(0, pp.bh || 0, 0, "YXZ");
          }
        }
      } else if (pb) pb.visible = false;
    }, 90);
  } catch (e) {}
}
