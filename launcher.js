(function () {
  const SRC = "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
    $ = (s) => document.querySelector(s),
    st = (t) => {
      const e = $("#st");
      if (e) e.textContent = t || "";
    },
    LINK = "https://claude.ai/artifact/Gm7qeHfVckZy4iFFgoD7yd",
    show = (id) => {
      ["m0", "m1", "m2", "m3"].forEach((x) => ($("#" + x).hidden = x !== id));
      st("");
    };
  const dm = function f(a, b) {
    for (const k in b) {
      const v = b[k];
      if (Array.isArray(v)) {
        const x = Array.isArray(a[k]) ? a[k] : [],
          s = new Set(x.map((i) => JSON.stringify(i)));
        v.forEach((i) => {
          if (!s.has(JSON.stringify(i))) x.push(i);
        });
        a[k] = x;
      } else if (v && typeof v === "object")
        a[k] = f(
          a[k] && typeof a[k] === "object" && !Array.isArray(a[k]) ? a[k] : {},
          v,
        );
      else a[k] = v;
    }
    return a;
  };
  function run() {
    $("#menu").remove();
    // multiplayer.js must load before game.js (async=false keeps the order)
    for (const f of ["multiplayer.js", "game.js"]) {
      const s = document.createElement("script");
      s.src = f;
      s.async = false;
      document.body.appendChild(s);
    }
    const b = document.createElement("button");
    b.className = "pill";
    b.id = "mnu";
    b.textContent = "🏠 Menu";
    b.onclick = async () => {
      if (window.__MP && window.__MP.direct) {
        await new Promise((r) => setTimeout(r, 900));
        await window.__exp();
      }
      location.reload();
    };
    document.body.appendChild(b);
  }
  function wrap(wid, onX) {
    const gi = Storage.prototype.getItem,
      si = Storage.prototype.setItem,
      ri = Storage.prototype.removeItem,
      mk = (k) => (/^island_/.test(k) ? wid + "_" + k : k);
    let tm = 0;
    Storage.prototype.getItem = function (k) {
      return gi.call(this, mk(k));
    };
    Storage.prototype.removeItem = function (k) {
      return ri.call(this, mk(k));
    };
    Storage.prototype.setItem = function (k, v) {
      si.call(this, mk(k), v);
      if (k === "island_x36") {
        clearTimeout(tm);
        tm = setTimeout(() => onX(v), 2500);
      }
    };
    return {
      seed: (v) => si.call(localStorage, mk("island_x36"), v),
      live: (o) => {
        try {
          if (window.X6) {
            dm(window.X6, o);
            si.call(localStorage, mk("island_x36"), JSON.stringify(window.X6));
          }
        } catch (e) {}
      },
    };
  }
  $("#bs").onclick = () => run();
  $("#bm").onclick = () => show("m1");
  $("#bd").onclick = () => {
    show("m3");
    if (!window.claude) $("#df").hidden = true;
  };
  $("#bo").onclick = () => show("m2");
  document
    .querySelectorAll(".bk")
    .forEach(
      (b) => (b.onclick = () => show(b.parentNode.id === "m1" ? "m0" : "m1")),
    );
  $("#br").onclick = () => {
    if (
      confirm(
        "Reset your SOLO island? Everything in solo mode is erased for good.",
      )
    ) {
      ["island_v36", "island_x36", "island_photos36"].forEach((k) =>
        localStorage.removeItem(k),
      );
      st("Solo island reset. Press Play solo for a fresh start.");
    }
  };
  $("#dr").onclick = () => {
    if (confirm("Erase the direct together-save on this device?")) {
      Object.keys(localStorage)
        .filter((k) => /^(mpd_S|mpd_T|direct_)/.test(k))
        .forEach((k) => localStorage.removeItem(k));
      st("Together-save reset on this device.");
    }
  };
  $("#bl").onclick = async () => {
    const i = $("#lk");
    i.hidden = false;
    i.value = LINK;
    i.select();
    try {
      await navigator.clipboard.writeText(LINK);
      st("Link copied. In Share, add her email as Contributor.");
    } catch (e) {
      st("Copy the link above. In Share, add her email as Contributor.");
    }
  };
  $("#df").onclick = async () => {
    try {
      const d = await claude.use("downloads");
      if (!d) throw { message: "not available" };
      await d.save({ filename: "our-island.html", data: SRC });
      st("Saved. Send her the file; she opens it in Chrome or Safari.");
    } catch (e) {
      st("Couldn't save the file here (" + (e.code || e.message) + ").");
    }
  };
  async function online(newGame) {
    st("Connecting…");
    let db, user, uid;
    try {
      [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
      uid = user && (await user.id());
    } catch (e) {}
    if (!db || !user || !uid) {
      st(
        "Couldn't connect. Open the game signed in to claude.ai from the invite shared with you, or use the direct link instead.",
      );
      return;
    }
    let wid = "main";
    try {
      const m = await db.doc("meta/world").get();
      if (m.exists) wid = (m.data() || {}).wid || "main";
      if (newGame) {
        if (
          !confirm(
            "Start a brand new shared island? You both switch to it; the old one stays saved.",
          )
        )
          return;
        wid = "g" + Date.now().toString(36);
        await db.doc("meta/world").set({ wid, by: uid, t: Date.now() });
      }
    } catch (e) {
      st(
        "Can't use the shared save (" +
          (e.code || e.message) +
          "). The owner must share it with you as Contributor.",
      );
      return;
    }
    const PX = "w/" + wid + "/",
      W = {
        doc: (p) => db.doc(PX + p),
        collection: (c) => db.collection(PX + c),
      },
      xd = W.doc("x6/main");
    let rx = {},
      w;
    w = wrap("mp" + wid, (v) => {
      try {
        rx = dm(rx, JSON.parse(v));
        xd.set({ j: JSON.stringify(rx), by: uid, t: Date.now() }).catch(
          () => {},
        );
      } catch (e) {}
    });
    try {
      const s = await xd.get();
      if (s.exists) {
        rx = JSON.parse(s.data().j || "{}");
        w.seed(s.data().j);
      }
      xd.onSnapshot((s) => {
        if (s.exists)
          try {
            rx = JSON.parse(s.data().j);
            w.live(rx);
          } catch (e) {}
      });
    } catch (e) {}
    window.__MP = { db: W, uid };
    run();
  }
  $("#bc").onclick = () => online(0);
  $("#bn").onclick = () => online(1);
  // ---------- direct mode: WebRTC, codes are swapped by message, no server and no account
  const ICE = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    },
    enc = (d) => btoa(unescape(encodeURIComponent(JSON.stringify(d)))),
    dec = (s) =>
      JSON.parse(decodeURIComponent(escape(atob(s.replace(/\s/g, ""))))),
    gather = (pc) =>
      new Promise((r) => {
        if (pc.iceGatheringState === "complete") return r();
        pc.onicegatheringstatechange = () =>
          pc.iceGatheringState === "complete" && r();
        setTimeout(r, 5000);
      });
  function directGame(ch) {
    let uid = localStorage.getItem("mpd_uid");
    if (!uid) {
      uid = "u" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("mpd_uid", uid);
    }
    let S = {},
      T = {};
    try {
      S = JSON.parse(localStorage.getItem("mpd_S") || "{}");
      T = JSON.parse(localStorage.getItem("mpd_T") || "{}");
    } catch (e) {}
    const send = (o) => {
        try {
          if (ch.readyState === "open") ch.send(JSON.stringify(o));
        } catch (e) {}
      },
      subs = [],
      cl = (x) => JSON.parse(JSON.stringify(x)),
      mg = (a, b) => {
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
    let sv = 0;
    const save = () => {
        clearTimeout(sv);
        sv = setTimeout(() => {
          try {
            localStorage.setItem("mpd_S", JSON.stringify(S));
            localStorage.setItem("mpd_T", JSON.stringify(T));
          } catch (e) {}
        }, 700);
      },
      notify = () => subs.forEach((f) => f());
    function ap(op, p, d, ts, remote) {
      if (remote && (T[p] || 0) > ts) return;
      if (op === "set") S[p] = cl(d);
      else if (op === "update") {
        S[p] = S[p] || {};
        mg(S[p], cl(d));
      } else delete S[p];
      T[p] = ts;
      save();
      notify();
      if (!remote) send({ t: "d", op, p, d, ts });
    }
    const snap = (c) => ({
        docs: Object.keys(S)
          .filter((k) => k.startsWith(c + "/"))
          .map((k) => ({ id: k.slice(c.length + 1), data: () => cl(S[k]) })),
      }),
      w = wrap("direct", (v) => {
        try {
          send({ t: "x", j: v });
        } catch (e) {}
      });
    const db = {
      collection: (c) => ({
        onSnapshot: (f) => {
          const r = () => f(snap(c));
          subs.push(r);
          setTimeout(r, 0);
        },
      }),
      doc: (p) => ({
        get: async () => ({ exists: p in S, data: () => cl(S[p]) }),
        set: async (d) => ap("set", p, d, Date.now()),
        update: async (d) => ap("update", p, d, Date.now()),
        delete: async () => ap("delete", p, null, Date.now()),
        onSnapshot: (f) => {
          const r = () => f({ exists: p in S, data: () => cl(S[p]) });
          subs.push(r);
          setTimeout(r, 0);
        },
      }),
    };
    let onP = () => {};
    const net = {
      send: (o) => send({ t: "p", o }),
      on: (f) => {
        onP = f;
      },
    };
    let lastP = 0;
    ch.onmessage = (e) => {
      let m;
      try {
        m = JSON.parse(e.data);
      } catch (x) {
        return;
      }
      if (m.t === "p") {
        lastP = Date.now();
        onP(m.o);
      } else if (m.t === "d") ap(m.op, m.p, m.d, m.ts, true);
      else if (m.t === "h") {
        m.docs.forEach(([p, d, ts]) => ap("set", p, d, ts, true));
      } else if (m.t === "x") {
        try {
          w.live(JSON.parse(m.j));
        } catch (x) {}
      }
    };
    setInterval(() => {
      if (lastP && Date.now() - lastP > 4000) {
        lastP = 0;
        onP(null);
      }
    }, 1000);
    ch.onclose = () => {
      onP(null);
      if (window.toast) toast("Connection lost. Press 🏠 Menu to reconnect.");
    };
    const ks = Object.keys(S);
    for (let i = 0; i < ks.length; i += 25)
      send({
        t: "h",
        docs: ks.slice(i, i + 25).map((k) => [k, S[k], T[k] || 0]),
      });
    try {
      send({ t: "x", j: localStorage.getItem("direct_island_x36") || "{}" });
    } catch (e) {}
    window.__MP = { db, uid, net, direct: 1 };
    run();
  }
  $("#pl").onclick = () => {
    if (!window.__ld && localStorage.getItem("mpd_S")) {
      st(
        "Load her latest changes file first (📥), so you don't overwrite her work.",
      );
      return;
    }
    directGame({ readyState: "closed", send() {} });
  };
  window.__exp = $("#ex").onclick = async () => {
    const data = JSON.stringify({
      S: localStorage.getItem("mpd_S") || "{}",
      T: localStorage.getItem("mpd_T") || "{}",
      X: localStorage.getItem("direct_island_x36") || "{}",
    });
    try {
      const d = await claude.use("downloads");
      await d.save({ filename: "our-island-changes.json", data });
      st("Saved. Send her the file.");
    } catch (e) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([data]));
      a.download = "our-island-changes.json";
      a.click();
      st("File downloaded. Send it to her.");
    }
  };
  $("#imb").onclick = () => $("#im").click();
  $("#im").onchange = async (e) => {
    try {
      const o = JSON.parse(await e.target.files[0].text()),
        S = JSON.parse(localStorage.getItem("mpd_S") || "{}"),
        T = JSON.parse(localStorage.getItem("mpd_T") || "{}"),
        S2 = JSON.parse(o.S),
        T2 = JSON.parse(o.T);
      let n = 0;
      for (const k in S2)
        if ((T2[k] || 0) > (T[k] || 0)) {
          S[k] = S2[k];
          T[k] = T2[k];
          n++;
        }
      localStorage.setItem("mpd_S", JSON.stringify(S));
      localStorage.setItem("mpd_T", JSON.stringify(T));
      localStorage.setItem(
        "direct_island_x36",
        JSON.stringify(
          dm(
            JSON.parse(localStorage.getItem("direct_island_x36") || "{}"),
            JSON.parse(o.X || "{}"),
          ),
        ),
      );
      window.__ld = 1;
      st("Merged " + n + " changes. Press Play now to see them.");
    } catch (x) {
      st("That file didn't work.");
    }
  };
  let pc, ch;
  const dx = $("#dx"),
    c1 = $("#c1"),
    c2 = $("#c2"),
    b2 = $("#go2");
  function chan(c) {
    ch = c;
    c.onopen = () => directGame(c);
  }
  $("#dh").onclick = async () => {
    dx.hidden = false;
    pc = new RTCPeerConnection(ICE);
    chan(pc.createDataChannel("g"));
    $("#dt").textContent =
      "1) Send the top code to her. 2) Paste her reply code in the bottom box and press Connect.";
    c1.value = "Making code…";
    c2.value = "";
    c2.placeholder = "Paste her reply code here";
    b2.textContent = "Connect";
    await pc.setLocalDescription(await pc.createOffer());
    await gather(pc);
    c1.value = enc(pc.localDescription);
    b2.onclick = async () => {
      try {
        await pc.setRemoteDescription(dec(c2.value));
        st("Connecting… keep both pages open");
      } catch (e) {
        st("That reply code didn't work, check you pasted all of it.");
      }
    };
  };
  $("#dj").onclick = () => {
    dx.hidden = false;
    pc = new RTCPeerConnection(ICE);
    pc.ondatachannel = (e) => chan(e.channel);
    $("#dt").textContent =
      "Paste the code he sent in the bottom box and press the button. A reply code appears on top: send it back and wait.";
    c1.value = "";
    c2.value = "";
    c2.placeholder = "Paste his code here";
    b2.textContent = "Make reply code";
    b2.onclick = async () => {
      try {
        await pc.setRemoteDescription(dec(c2.value));
        await pc.setLocalDescription(await pc.createAnswer());
        c1.value = "Making reply…";
        await gather(pc);
        c1.value = enc(pc.localDescription);
        st("Send the reply code back. The game starts when he connects.");
      } catch (e) {
        st("That code didn't work, check you pasted all of it.");
      }
    };
  };
})();
