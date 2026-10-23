// Main Application Controller for Dark Ride Atlas
(function () {
  const state = {
    activeView: "explorer",
    searchQuery: "",
    parkFilter: "all",
    catFilter: "all",
    mfgFilter: "all",
    videoFilter: "all", // 'all' | 'lightson' | 'mfgdemo'
    treePart: "part1", // 'part1' | 'part2'
    selectedMechCode: "1.1.2.1",
    activeParkMatrix: "disney",
    parkMatrixSearch: "",
    compareIds: [],
    theme: "dark"
  };

  // Helper: Find mechanism node by code
  function findMechNode(code) {
    for (const partKey of ["part1", "part2"]) {
      for (const cat of window.MECHANISM_TREE_DATA[partKey]) {
        for (const grp of cat.groups) {
          for (const node of grp.nodes) {
            if (node.code === code || code.includes(node.code) || node.code.includes(code)) {
              return { node, cat, partKey };
            }
          }
        }
      }
    }
    return null;
  }

  // 1. Switch Main Views
  window.switchView = function (viewName) {
    state.activeView = viewName;
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });
    document.querySelectorAll(".view-section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === "view-" + viewName);
    });
    if (viewName === "lab") {
      renderLab();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. Render Explorer Rides Grid
  window.renderExplorer = function () {
    const q = state.searchQuery.trim().toLowerCase();
    const filtered = window.DARK_RIDE_DATA.filter((r) => {
      if (state.parkFilter !== "all" && r.parkGroup !== state.parkFilter) return false;
      if (state.catFilter !== "all" && r.cat !== state.catFilter) return false;
      if (state.mfgFilter !== "all" && !r.mfg.toLowerCase().includes(state.mfgFilter.toLowerCase())) return false;
      if (state.videoFilter === "lightson" && !r.lightsOnId) return false;
      if (state.videoFilter === "mfgdemo" && !r.mfgDemoId) return false;
      if (q) {
        const hay = `${r.name} ${r.en} ${r.park} ${r.code} ${r.mfg} ${r.visual} ${r.summary} ${r.dof.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const countEl = document.getElementById("explorer-result-count");
    if (countEl) countEl.textContent = filtered.length;

    const grid = document.getElementById("rides-grid-container");
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 48px 20px; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-color);">
        <p style="font-size:16px; font-weight:700; margin-bottom:8px;">未找到匹配的游乐项目</p>
        <p style="color:var(--text-secondary); margin-bottom:14px;">请尝试重置筛选条件或更换搜索关键词（支持搜项目名、乐园、KUKA、Oceaneering、无轨、EMV 等）</p>
        <button class="icon-btn" onclick="resetExplorerFilters()">重置全部筛选</button>
      </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((r) => {
        const isCompared = state.compareIds.includes(r.id);
        const biliUrl = `https://search.bilibili.com/all?keyword=${encodeURIComponent(r.bili)}`;
        return `
      <article class="ride-card">
        <div class="ride-card-top">
          <div class="ride-badges">
            <span class="code-badge" title="点击查看该硬件机制详情" onclick="jumpToMechanism('${r.code}')">机制 ${r.code}</span>
            <span class="park-tag">${r.park}</span>
          </div>
          <div>
            <h3 class="ride-title-zh">${r.name}</h3>
            <div class="ride-title-en">${r.en}</div>
          </div>
          <div class="ride-meta-row">
            <span class="mfg-chip">🏭 ${r.mfg}</span>
            <span class="visual-chip">👁️ ${r.visual}</span>
          </div>
          <div class="ride-meta-row">
            ${r.dof.map((d) => `<span class="dof-chip">${d}</span>`).join("")}
          </div>
          <p class="ride-desc">${r.summary}</p>
        </div>
        <div class="ride-actions">
          <button class="btn-action btn-play-pov" onclick="openRideVideoModal('${r.id}', 'pov')">
            ▶ 站内看 4K POV
          </button>
          ${
            r.lightsOnId
              ? `<button class="btn-action btn-lights-on" onclick="openRideVideoModal('${r.id}', 'lightson')">💡 开灯揭秘 Lights-On</button>`
              : ""
          }
          ${
            r.mfgDemoId
              ? `<button class="btn-action btn-mfg-demo" onclick="openRideVideoModal('${r.id}', 'mfgdemo')">🔧 制造商裸车测试</button>`
              : ""
          }
          <a class="btn-action btn-bili" href="${biliUrl}" target="_blank" rel="noopener">
            📺 B站实拍
          </a>
          <button class="btn-action btn-compare ${isCompared ? "selected" : ""}" onclick="toggleCompareRide('${r.id}')">
            ${isCompared ? "✓ 已加对比" : "⚖️ 对比"}
          </button>
        </div>
      </article>`;
      })
      .join("");
  };

  window.setExplorerFilter = function (type, val) {
    if (type === "park") state.parkFilter = val;
    if (type === "cat") state.catFilter = val;
    if (type === "mfg") state.mfgFilter = val;
    if (type === "video") state.videoFilter = val;

    document.querySelectorAll(`[data-filter-type="${type}"]`).forEach((el) => {
      el.classList.toggle("active", el.dataset.val === val);
    });
    renderExplorer();
  };

  window.resetExplorerFilters = function () {
    state.searchQuery = "";
    state.parkFilter = "all";
    state.catFilter = "all";
    state.mfgFilter = "all";
    state.videoFilter = "all";
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) searchInput.value = "";
    const mfgSelect = document.getElementById("mfg-filter-select");
    if (mfgSelect) mfgSelect.value = "all";
    document.querySelectorAll(".filter-pill").forEach((el) => {
      el.classList.toggle("active", el.dataset.val === "all");
    });
    renderExplorer();
  };

  // 3. Render Variable-Depth Mechanism Logic Tree
  window.setTreePart = function (partKey) {
    state.treePart = partKey;
    document.querySelectorAll(".tree-part-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.part === partKey);
    });
    const firstNode = window.MECHANISM_TREE_DATA[partKey][0].groups[0].nodes[0];
    state.selectedMechCode = firstNode.code;
    renderTreeSidebar();
    renderTreeDetail();
  };

  window.selectMechanismNode = function (code) {
    state.selectedMechCode = code;
    renderTreeSidebar();
    renderTreeDetail();
  };

  window.jumpToMechanism = function (code) {
    const found = findMechNode(code);
    if (found) {
      state.treePart = found.partKey;
      state.selectedMechCode = found.node.code;
      document.querySelectorAll(".tree-part-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.part === found.partKey);
      });
    }
    switchView("tree");
    renderTreeSidebar();
    renderTreeDetail();
  };

  function renderTreeSidebar() {
    const container = document.getElementById("tree-sidebar-list");
    if (!container) return;
    const categories = window.MECHANISM_TREE_DATA[state.treePart];
    container.innerHTML = categories
      .map(
        (cat) => `
      <div class="tree-cat-block">
        <div class="tree-cat-header">
          <span>${cat.title}</span>
        </div>
        <div class="tree-cat-body">
          ${cat.groups
            .map(
              (grp) => `
            <div class="tree-group-label">${grp.groupTitle}</div>
            ${grp.nodes
              .map(
                (n) => `
              <button class="tree-node-btn ${state.selectedMechCode === n.code ? "active" : ""}" onclick="selectMechanismNode('${n.code}')">
                <span class="tree-node-code">${n.code}</span>
                <span>${n.name}</span>
              </button>`
              )
              .join("")}
          `
            )
            .join("")}
        </div>
      </div>`
      )
      .join("");
  }

  function renderTreeDetail() {
    const pane = document.getElementById("tree-detail-pane");
    if (!pane) return;
    const found = findMechNode(state.selectedMechCode) || {
      node: window.MECHANISM_TREE_DATA.part1[0].groups[0].nodes[0],
      cat: window.MECHANISM_TREE_DATA.part1[0]
    };
    const { node, cat } = found;

    // Matching rides in explorer
    const matchingRides = window.DARK_RIDE_DATA.filter(
      (r) => r.code === node.code || r.code.includes(node.code) || node.code.includes(r.code)
    );

    pane.innerHTML = `
      <div class="mech-detail-header">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
          <span class="code-badge" style="font-size:13px; padding:4px 10px;">机制编码：${node.code}</span>
          <span class="park-tag">${cat.title}</span>
        </div>
        <h2 style="font-size:22px; font-weight:800; margin-bottom:6px;">${node.name}</h2>
        <p style="color:var(--text-secondary); font-size:13.5px;">${node.principle}</p>
      </div>

      <div class="mech-anatomy-grid">
        <div class="anatomy-box">
          <div class="label">物理支撑与导引介质</div>
          <div class="val">${node.support}</div>
        </div>
        <div class="anatomy-box">
          <div class="label">运动学自由度 (DOF)</div>
          <div class="val" style="color:var(--accent-emerald);">${node.dof}</div>
        </div>
        <div class="anatomy-box">
          <div class="label">核心设备制造商</div>
          <div class="val" style="color:var(--accent-purple);">${node.mfg}</div>
        </div>
      </div>

      ${
        node.demoYtId
          ? `<div style="margin-bottom:20px; display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn-action btn-mfg-demo" style="padding:8px 14px; font-size:13px;" onclick="openRawYtModal('${node.demoYtId}', '${node.code} ${node.name} - 工程演示与实拍')">
                🔧 站内播放该机制裸机测试 / 标杆实拍视频
              </button>
              <a class="btn-action" href="https://www.youtube.com/watch?v=${node.demoYtId}" target="_blank" rel="noopener">
                ↗ 在 YouTube 打开
              </a>
            </div>`
          : ""
      }

      <h3 style="font-size:15px; font-weight:700; margin-bottom:10px; color:var(--accent-blue);">
        📋 该机制下全球各大乐园项目穷举盘点
      </h3>
      <div class="park-exhaust-list">
        ${node.parks
          .map(
            (p) => `
          <div class="park-exhaust-item">
            <strong>【${p.label}】</strong>：${p.items}
          </div>`
          )
          .join("")}
      </div>

      ${
        matchingRides.length > 0
          ? `<h3 style="font-size:15px; font-weight:700; margin:24px 0 12px; color:var(--accent-amber);">
              🎬 关联标杆项目视频卡片 (${matchingRides.length})
            </h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
              ${matchingRides
                .map(
                  (r) => `
                <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:10px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
                  <div>
                    <div style="font-weight:700; font-size:14px;">${r.name}</div>
                    <div style="font-size:11px; color:var(--text-muted);">${r.park} · ${r.mfg}</div>
                  </div>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <button class="btn-action btn-play-pov" onclick="openRideVideoModal('${r.id}', 'pov')">▶ 4K POV</button>
                    ${
                      r.lightsOnId
                        ? `<button class="btn-action btn-lights-on" onclick="openRideVideoModal('${r.id}', 'lightson')">💡 开灯版</button>`
                        : ""
                    }
                    ${
                      r.mfgDemoId
                        ? `<button class="btn-action btn-mfg-demo" onclick="openRideVideoModal('${r.id}', 'mfgdemo')">🔧 裸车测试</button>`
                        : ""
                    }
                  </div>
                </div>`
                )
                .join("")}
            </div>`
          : ""
      }
    `;
  }

  // 4. Interactive SVG X-Ray Lab Controller
  window.selectLabMode = function (idx) {
    window.XRAY_LAB.currentMode = idx;
    renderLab();
  };

  window.updateLabSlider = function (axis, val) {
    window.XRAY_LAB[axis] = Number(val);
    const valEl = document.getElementById(`lab-val-${axis}`);
    if (valEl) {
      valEl.textContent = axis === "heave" ? `${val}%` : `${val}°`;
    }
    const canvas = document.getElementById("xray-svg-canvas");
    if (canvas) {
      canvas.innerHTML = window.XRAY_LAB.renderSvg();
    }
  };

  window.toggleLabAutoPlay = function () {
    const lab = window.XRAY_LAB;
    lab.autoPlay = !lab.autoPlay;
    const btn = document.getElementById("lab-autoplay-btn");
    if (btn) {
      btn.textContent = lab.autoPlay ? "⏸ 停止自动运动演示" : "▶ 开启 6-DOF 自动正弦演示";
      btn.classList.toggle("active", lab.autoPlay);
    }
    if (lab.autoPlay) {
      let t = 0;
      function step() {
        if (!lab.autoPlay) return;
        t += 0.045;
        lab.pitch = Math.round(Math.sin(t) * 20);
        lab.roll = Math.round(Math.cos(t * 0.8) * 18);
        lab.yaw = Math.round(Math.sin(t * 0.6) * 45);
        lab.heave = Math.round(50 + Math.sin(t * 0.7) * 45);

        ["pitch", "roll", "yaw", "heave"].forEach((ax) => {
          const inp = document.getElementById(`lab-input-${ax}`);
          const lbl = document.getElementById(`lab-val-${ax}`);
          if (inp) inp.value = lab[ax];
          if (lbl) lbl.textContent = ax === "heave" ? `${lab[ax]}%` : `${lab[ax]}°`;
        });
        const canvas = document.getElementById("xray-svg-canvas");
        if (canvas) canvas.innerHTML = lab.renderSvg();
        lab.animFrame = requestAnimationFrame(step);
      }
      lab.animFrame = requestAnimationFrame(step);
    } else if (lab.animFrame) {
      cancelAnimationFrame(lab.animFrame);
    }
  };

  window.renderLab = function () {
    const lab = window.XRAY_LAB;
    const modeObj = lab.modes[lab.currentMode];
    document.querySelectorAll(".lab-tab-btn").forEach((b, i) => {
      b.classList.toggle("active", i === lab.currentMode);
    });
    const canvas = document.getElementById("xray-svg-canvas");
    if (canvas) canvas.innerHTML = lab.renderSvg();

    const infoBox = document.getElementById("xray-mode-info");
    if (infoBox) {
      infoBox.innerHTML = `
        <div style="font-weight:800; font-size:15px; color:var(--accent-blue); margin-bottom:6px;">${modeObj.title}</div>
        <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">${modeObj.keyPoint}</p>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${modeObj.videos
            .map(
              (v) =>
                `<button class="btn-action btn-mfg-demo" onclick="openRawYtModal('${v.ytId}', '${v.label}')">${v.label}</button>`
            )
            .join("")}
        </div>
      `;
    }
  };

  // 5. Render Exhaustive Global Park Matrices (Part 3)
  window.selectParkMatrix = function (key) {
    state.activeParkMatrix = key;
    document.querySelectorAll(".park-matrix-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.parkkey === key);
    });
    renderParkMatrixTable();
  };

  window.onParkMatrixSearch = function (val) {
    state.parkMatrixSearch = val.trim().toLowerCase();
    renderParkMatrixTable();
  };

  function renderParkMatrixTable() {
    const data = window.PARK_MATRIX_DATA[state.activeParkMatrix];
    const container = document.getElementById("park-matrix-content");
    if (!container || !data) return;

    const q = state.parkMatrixSearch;
    const rows = data.rows.filter((r) => {
      if (!q) return true;
      const text = `${r.col1} ${r.col2.join(" ")} ${r.col3.join(" ")}`.toLowerCase();
      return text.includes(q);
    });

    container.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <h2 style="font-size:18px; font-weight:800; color:var(--accent-blue);">${data.title}</h2>
        <input type="text" placeholder="在当前乐园体系内搜索项目或机制编号..." value="${state.parkMatrixSearch}"
          oninput="onParkMatrixSearch(this.value)"
          style="padding:7px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary); width:280px; font-size:12.5px;" />
      </div>
      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width:22%;">${data.headers[0]}</th>
              <th style="width:42%;">${data.headers[1]}</th>
              <th style="width:36%;">${data.headers[2]}</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) => `
              <tr>
                <td>${r.col1}</td>
                <td>${r.col2.map((item) => `<div class="matrix-ride-item">• ${item}</div>`).join("")}</td>
                <td>${r.col3.map((item) => `<div class="matrix-ride-item">• ${item}</div>`).join("")}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // 6. Render 6 Engineering Distinctions Deep-Dive
  function renderDistinctions() {
    const container = document.getElementById("distinctions-container");
    if (!container) return;
    container.innerHTML = window.DISTINCTIONS_DATA.map(
      (d) => `
      <section class="distinction-card" id="${d.id}">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <h3>${d.title}</h3>
          <button class="btn-action btn-mfg-demo" onclick="switchView('lab'); selectLabMode(${d.labTab});">
            🔬 在机械透视实验室中动态对比此组机制
          </button>
        </div>
        <div class="distinction-subtitle">${d.subtitle}</div>
        <p style="color:var(--text-secondary); margin-bottom:16px; font-size:13.5px;">${d.intro}</p>
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                ${d.headers.map((h) => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${d.rows
                .map(
                  (row) => `
                <tr>
                  ${row.map((cell, idx) => `<td style="${idx === 0 ? "font-weight:700; color:var(--accent-blue);" : ""}">${cell}</td>`).join("")}
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>`
    ).join("");
  }

  // 7. Render Visual & Player Interaction Matrix (Part 4)
  function renderVisualMatrix() {
    const container = document.getElementById("visual-matrix-container");
    if (!container) return;
    const items = window.MECHANISM_TREE_DATA.visualAndInteraction;
    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:16px;">
        ${items
          .map(
            (item) => `
          <div class="ride-card">
            <div class="ride-card-top">
              <div class="ride-badges">
                <span class="code-badge" style="background:${
                  item.type === "视觉演艺" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)"
                }; color:${item.type === "视觉演艺" ? "var(--accent-amber)" : "var(--accent-emerald)"};">
                  ${item.type === "视觉演艺" ? "👁️ 视觉演艺机制" : "🎮 玩家交互机制"}
                </span>
              </div>
              <h3 class="ride-title-zh">${item.name}</h3>
              <p class="ride-desc">${item.desc}</p>
            </div>
            <div style="padding-top:10px; border-top:1px solid var(--border-color); font-size:12px; color:var(--text-secondary);">
              <strong style="color:var(--accent-blue);">全球标杆代表：</strong>${item.examples}
            </div>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  // 8. In-App YouTube Cinema Modal Player
  window.openRideVideoModal = function (rideId, mode) {
    const ride = window.DARK_RIDE_DATA.find((r) => r.id === rideId);
    if (!ride) return;

    let activeYtId = ride.ytId;
    if (mode === "lightson" && ride.lightsOnId) activeYtId = ride.lightsOnId;
    if (mode === "mfgdemo" && ride.mfgDemoId) activeYtId = ride.mfgDemoId;

    const modal = document.getElementById("video-modal-backdrop");
    const titleEl = document.getElementById("video-modal-title");
    const tabsEl = document.getElementById("video-modal-tabs");
    const iframeWrap = document.getElementById("video-modal-iframe-wrap");
    const footerEl = document.getElementById("video-modal-footer");

    titleEl.innerHTML = `<span class="code-badge" style="margin-right:8px;">${ride.code}</span> ${ride.name} <span style="color:var(--text-muted); font-size:13px; font-weight:400;">(${ride.park} · ${ride.mfg})</span>`;

    const sources = [
      { key: "pov", label: "🎬 4K 全程 POV 实拍", id: ride.ytId },
      ...(ride.lightsOnId ? [{ key: "lightson", label: "💡 清场开灯揭秘 (Lights-On)", id: ride.lightsOnId }] : []),
      ...(ride.mfgDemoId ? [{ key: "mfgdemo", label: "🔧 硬件制造商官方裸车测试", id: ride.mfgDemoId }] : [])
    ];

    tabsEl.innerHTML = sources
      .map(
        (s) => `
      <button class="btn-action ${s.key === mode ? "btn-play-pov" : ""}" onclick="openRideVideoModal('${ride.id}', '${s.key}')">
        ${s.label}
      </button>`
      )
      .join("");

    iframeWrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${activeYtId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    const biliUrl = `https://search.bilibili.com/all?keyword=${encodeURIComponent(ride.bili)}`;
    footerEl.innerHTML = `
      <div style="font-size:12.5px; color:var(--text-secondary); max-width:650px;">
        <strong>自由度与视觉：</strong>${ride.dof.join(" + ")} ｜ ${ride.visual}
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <a class="btn-action btn-play-pov" href="https://www.youtube.com/watch?v=${activeYtId}" target="_blank" rel="noopener">↗ 在 YouTube 新窗口打开</a>
        <a class="btn-action btn-bili" href="${biliUrl}" target="_blank" rel="noopener">📺 在 Bilibili 搜索实拍</a>
      </div>
    `;

    modal.classList.add("open");
  };

  window.openRawYtModal = function (ytId, title) {
    const modal = document.getElementById("video-modal-backdrop");
    document.getElementById("video-modal-title").textContent = title;
    document.getElementById("video-modal-tabs").innerHTML = `<span style="font-size:12px; color:var(--text-secondary);">工程实拍与原理演示直达播放器</span>`;
    document.getElementById("video-modal-iframe-wrap").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    document.getElementById("video-modal-footer").innerHTML = `
      <div style="font-size:12px; color:var(--text-muted);">如遇部分视频因版权限制禁止外部嵌入，请点击右侧按钮直接在 YouTube 打开。</div>
      <a class="btn-action btn-play-pov" href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener">↗ 在 YouTube 新窗口打开</a>
    `;
    modal.classList.add("open");
  };

  window.closeVideoModal = function () {
    const modal = document.getElementById("video-modal-backdrop");
    const iframeWrap = document.getElementById("video-modal-iframe-wrap");
    if (iframeWrap) iframeWrap.innerHTML = "";
    if (modal) modal.classList.remove("open");
  };

  // 9. Side-by-Side Ride Comparison Tool
  window.toggleCompareRide = function (rideId) {
    const idx = state.compareIds.indexOf(rideId);
    if (idx >= 0) {
      state.compareIds.splice(idx, 1);
    } else {
      if (state.compareIds.length >= 3) {
        state.compareIds.shift();
      }
      state.compareIds.push(rideId);
    }
    renderExplorer();
    renderCompareDock();
  };

  function renderCompareDock() {
    const dock = document.getElementById("compare-dock");
    const chips = document.getElementById("compare-chips-list");
    if (!dock || !chips) return;

    if (state.compareIds.length === 0) {
      dock.classList.remove("visible");
      return;
    }
    dock.classList.add("visible");
    const rides = state.compareIds.map((id) => window.DARK_RIDE_DATA.find((r) => r.id === id)).filter(Boolean);
    chips.innerHTML = rides
      .map(
        (r) => `
      <span class="compare-chip">
        <strong>${r.name.split("/")[0]}</strong> (${r.code})
        <button style="background:none; border:none; color:var(--text-muted); cursor:pointer;" onclick="toggleCompareRide('${r.id}')">✕</button>
      </span>`
      )
      .join("");
  }

  window.openCompareModal = function () {
    const rides = state.compareIds.map((id) => window.DARK_RIDE_DATA.find((r) => r.id === id)).filter(Boolean);
    if (rides.length === 0) return;
    const modal = document.getElementById("compare-modal-backdrop");
    const body = document.getElementById("compare-modal-body");

    body.innerHTML = `
      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width:18%;">对比维度</th>
              ${rides.map((r) => `<th>${r.name}<br><span style="font-size:11px; color:var(--text-muted);">${r.en}</span></th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>硬件机制编码</strong></td>
              ${rides.map((r) => `<td><span class="code-badge">${r.code}</span></td>`).join("")}
            </tr>
            <tr>
              <td><strong>所属乐园</strong></td>
              ${rides.map((r) => `<td>${r.park}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>核心硬件制造商</strong></td>
              ${rides.map((r) => `<td style="color:var(--accent-purple); font-weight:700;">${r.mfg}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>运动学自由度 (DOF)</strong></td>
              ${rides.map((r) => `<td>${r.dof.map((d) => `<span class="dof-chip" style="margin:2px; display:inline-block;">${d}</span>`).join("")}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>视觉演艺载体</strong></td>
              ${rides.map((r) => `<td style="color:var(--accent-amber);">${r.visual}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>底层工程解析</strong></td>
              ${rides.map((r) => `<td style="font-size:12.5px; color:var(--text-secondary);">${r.summary}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;
    modal.classList.add("open");
  };

  window.closeCompareModal = function () {
    document.getElementById("compare-modal-backdrop").classList.remove("open");
  };

  // 10. Theme Switcher
  window.toggleTheme = function () {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.textContent = state.theme === "dark" ? "☀️ 浅色模式" : "🌙 工程暗色";
  };

  // Initialization on DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (state.activeView !== "explorer") {
          switchView("explorer");
        } else {
          renderExplorer();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
      if (e.key === "Escape") {
        closeVideoModal();
        closeCompareModal();
      }
    });

    renderExplorer();
    renderTreeSidebar();
    renderTreeDetail();
    renderLab();
    renderParkMatrixTable();
    renderDistinctions();
    renderVisualMatrix();
  });
})();
