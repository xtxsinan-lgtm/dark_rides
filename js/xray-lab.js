// Interactive SVG X-Ray Mechanical Schematic & 6-DOF / Flying Theater Simulator
window.XRAY_LAB = {
  currentMode: 0,
  pitch: 14,
  roll: -10,
  yaw: 22,
  heave: 55,
  autoPlay: false,
  animFrame: null,
  flyingMode: "T1.1",
  flyingProgress: 85,

  modes: [
    {
      title: "① 地面轨道 KUKA 6轴工业机械臂 (1.1.3.1) vs 顶部悬挂多自由度动感座舱 (3.3)",
      leftTitle: "1.1.3.1 环球《禁忌之旅 / 怪物大暴走》(KUKA 地面轨道6轴臂)",
      rightTitle: "3.3 中国方特《烈焰风云》(天花板悬挂 240° 抓举动感座舱)",
      keyPoint: "核心误区澄清：环球《哈利·波特与禁忌之旅》的轨道其实在地面下方（被黑色吸光踏板遮挡），由地面重型配重底盘托起 6 轴串联机器人抓持座椅背面；而方特《烈焰风云》的工字钢轨道真正架设在天花板上方，座舱重心始终垂挂在轨道正下方。",
      videos: [
        { label: "🔧 KUKA 机械臂裸机演示", ytId: "2_SEJHxlmWw" },
        { label: "💡 禁忌之旅开灯揭秘 (Lights-On)", ytId: "OGY6P6UkH4Q" },
        { label: "🎬 Monsters Unchained 4K POV", ytId: "7AbnllQNN4o" }
      ]
    },
    {
      title: "② 车载 6-DOF 多媒体动感车 (1.1.2.1 SCOOP) vs 12座液压越野吉普 (1.1.2.3 EMV)",
      leftTitle: "1.1.2.1 环球《蜘蛛侠/变形金刚》& 方特《女娲补天》(SCOOP)",
      rightTitle: "1.1.2.3 迪士尼《印第安纳琼斯》& 方特《秦俑地宫》(EMV)",
      keyPoint: "核心差异：左图 SCOOP 系统在 6-DOF 斯图尔特平台上方装有 360° 大直径回转支承，依靠高速自转切换多块 3D 屏幕并在原地制造 400 英尺坠楼错觉；右图 EMV 吉普车不做 360° 陀螺自转、不戴 3D 眼镜，专注利用大行程液压油缸在纯实景兵马俑/古墓中还原猛烈颠簸与断桥路感。",
      videos: [
        { label: "🔧 Oceaneering EVO-6 裸车测试", ytId: "CySHvb_4fHk" },
        { label: "💡 蜘蛛侠开灯运行 (Lights-On)", ytId: "cQzoWJAL49g" },
        { label: "🎬 印第安纳琼斯 4K POV", ytId: "7RJLNQRBRYI" }
      ]
    },
    {
      title: "③ 方特《神画 / 千古风华》(2.2.2) 无轨多自由度车 + 内凹倾斜球幕《千里江山图》飞跃揭秘",
      leftTitle: "平地画卷段：下层无轨 AGV + 上层多自由度伺服平台",
      rightTitle: "千里江山图段：停靠内凹倾斜球幕悬崖边缘 + 前倾俯冲欺骗前庭",
      keyPoint: "为什么坐地面无轨车能飞出球幕飞行影院体感？① 车体分为下层无轨 AGV 与上层多自由度俯仰/横滚平台；② 高潮段驶入内凹倾斜球幕深坑边缘遮蔽真实地面（剥夺下视野）；③ 画面俯冲时车体低头前倾 18° 改变重力分量，配合 180° 3D 光流 (Vection) 与迎面冷风完成前庭欺骗！",
      videos: [
        { label: "🎬 荆州方特《千古风华》全程 POV", ytId: "PptiYHy7W1c" },
        { label: "🔧 ETF 无轨底盘原理演示", ytId: "dzSVhAota8w" }
      ]
    },
    {
      title: "④ 水下直线电机全向巨船 (5.1.3.1 上海加勒比) vs 水下万向球铰摇摆快艇 (5.1.3.2 法国百慕大)",
      leftTitle: "5.1.3.1 上海迪士尼《加勒比海盗》(水下 LSM 导轨 + 360°自转横移)",
      rightTitle: "5.1.3.2 法国 Futuroscope《Mission Bermudes》(Mack Rocking Boat)",
      keyPoint: "水上高自由度双雄：上海《加勒比海盗》水底深处铺设刚性变轨钢轨与直线电机滑块，通过旋转立柱控制 30 人巨船 360° 原地自转、螃蟹步横移与倒退；2025 全球首发的 Mack Rocking Boat 则通过水下万向球铰支撑臂，主动驱动水面快艇做出剧烈的左右横滚 (Roll) 与翘头俯仰 (Pitch)。",
      videos: [
        { label: "💡 上海加勒比海盗水下轨道拆解", ytId: "lpX8YHcepW8" },
        { label: "🔧 Mack Rocking Boat 官方工程演示", ytId: "d6srd2tchaA" },
        { label: "🎬 Mission Bermudes 2025 实拍", ytId: "yRLKS3Xc-7s" }
      ]
    },
    {
      title: "⑤ 多级行星倾斜旋转舞台 (T3.1 骷髅之舞) vs 360° 全封闭 LED 球体悬挂环 (T2.5 超球体)",
      leftTitle: "T3.1 荷兰 Efteling《Danse Macabre》(18米倾斜升降主转盘 + 6子转盘)",
      rightTitle: "T2.5 阿布扎比《Hypersphere 360°》(全封闭空心 LED 球体内部悬挂环)",
      keyPoint: "新一代巨型动感剧场：左图 Intamin Dynamic Motion Stage 用中央巨型液压缸托起 18 米、125 吨主转盘做大倾角倾斜与 27km/h 旋转，上方 6 个小转盘行星交错自转；右图伸缩桥撤回后，游客悬在 17 米全封闭 LED 空心球体球心旋转倾斜，连脚底深渊都是屏幕！",
      videos: [
        { label: "🔧 Intamin 18米旋转舞台裸机测试", ytId: "i3u04ZhalaU" },
        { label: "🎬 Danse Macabre 2024 POV", ytId: "f9mz7TZbTaM" },
        { label: "🎬 Hypersphere 360° 4K POV", ytId: "nAg2c4-RzlI" }
      ]
    },
    {
      title: "⑥ 悬挂式球幕飞行影院 (Flying Theater) 四大入场机械流派动态模拟器 (T1.1 ~ T1.4)",
      leftTitle: "拖动右侧【入球进度 Heave 滑块 (0~100%)】观察 4 种重型机械如何将游客送入球心",
      rightTitle: "T1.1 顶置提拉 / T1.2 多层平推 / T1.3 钢架拉升 / T1.4 平地 90° 竖立翻转",
      keyPoint: "拖动右侧第 4 个滑块（入球行程 0% → 100%），即可对比观察：T1.1 迪士尼《翱翔》钢缆从平地提拉三排吊篮、T1.2 方特《伴你飞翔》三层楼板水平前推悬臂、T1.3 方特《飞越极限》百人钢架整体垂直拉升、以及 T1.4 法国《非凡之旅》/云顶《独立日》平地入座 90° 整体翻转竖立！",
      videos: [
        { label: "🔧 Dynamic 飞行影院机械结构拆解", ytId: "Zs-fO9--u8w" },
        { label: "🎬 法国《非凡之旅》90°翻转实拍", ytId: "_Bi4Tg1TuWw" },
        { label: "🎬 迪士尼《翱翔》4K POV", ytId: "m5tYn38g7LU" }
      ]
    }
  ],

  renderSvg() {
    const p = this.pitch;
    const r = this.roll;
    const y = this.yaw;
    const h = this.heave; // 0 to 100
    const m = this.currentMode;

    if (m === 0) {
      // KUKA Floor Arm vs Overhead Suspended Cabin
      const armJ2 = -20 + p * 0.9;
      const armJ3 = 25 + r * 1.1;
      const seatRot = p * 1.4;
      const suspSwing = p * 1.2;
      return `
      <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(56,189,248,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="820" height="350" fill="url(#grid)"/>
        <line x1="410" y1="15" x2="410" y2="335" stroke="#334155" stroke-dasharray="6,6" stroke-width="1.5"/>

        <!-- LEFT: 1.1.3.1 KUKA Floor-Tracked 6-Axis Arm -->
        <text x="20" y="28" fill="#38bdf8" font-size="13" font-weight="bold">1.1.3.1 环球《禁忌之旅》：地面导轨 + 6轴串联工业机械臂</text>
        <!-- Carousel of Domes overhead -->
        <path d="M 280 55 Q 345 140 280 230" fill="none" stroke="#a855f7" stroke-width="4"/>
        <text x="245" y="48" fill="#a855f7" font-size="11">随车同步旋转半球幕</text>

        <!-- Floor Track & False Floor -->
        <rect x="25" y="305" width="350" height="16" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
        <text x="40" y="335" fill="#f59e0b" font-size="11" font-weight="bold">⚡ 地面连续导电槽轨 (真实承重轨在地面！)</text>
        <line x1="25" y1="272" x2="375" y2="272" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
        <text x="28" y="265" fill="#94a3b8" font-size="10">黑色吸光遮挡假地板</text>

        <!-- Moving Base + KUKA 6-axis Arm -->
        <g transform="translate(${115 + (h - 50) * 0.7}, 305)">
          <rect x="-36" y="-28" width="72" height="28" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
          <text x="-26" y="-10" fill="#e2e8f0" font-size="10">J1配重底座</text>
          <g transform="translate(0, -28) rotate(${armJ2})">
            <rect x="-10" y="-95" width="20" height="95" rx="6" fill="#f97316" stroke="#fdba74" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="8" fill="#0f172a" stroke="#f97316" stroke-width="3"/>
            <text x="14" y="-45" fill="#fdba74" font-size="10">J2大臂</text>
            <g transform="translate(0, -90) rotate(${armJ3})">
              <rect x="-8" y="-12" width="88" height="16" rx="5" fill="#f97316" stroke="#fdba74" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#f97316" stroke-width="2.5"/>
              <text x="20" y="-16" fill="#fdba74" font-size="10">J3小臂+J4-J6手腕</text>
              <!-- 4-Seat Bench held from top-back -->
              <g transform="translate(82, 0) rotate(${seatRot})">
                <circle cx="0" cy="0" r="6" fill="#38bdf8"/>
                <path d="M 0 0 L 15 28 L 38 28" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
                <circle cx="22" cy="12" r="7" fill="#10b981"/>
                <text x="-15" y="48" fill="#10b981" font-size="11" font-weight="bold">4人悬空椅 (±110°仰躺)</text>
              </g>
            </g>
          </g>
        </g>

        <!-- RIGHT: 3.3 Overhead Suspended Motion Cabin -->
        <text x="430" y="28" fill="#10b981" font-size="13" font-weight="bold">3.3 方特《烈焰风云》：天花板轨道 + 悬挂抓举动感座舱</text>
        <!-- Overhead I-Beam Track -->
        <rect x="435" y="45" width="355" height="16" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="450" y="76" fill="#10b981" font-size="11" font-weight="bold">⚡ 天花板重型工字钢承重轨道 (重心始终在轨道正下方)</text>

        <g transform="translate(${595 + (h - 50) * 0.7}, 61)">
          <!-- Trolley & Yaw Ring -->
          <rect x="-32" y="0" width="64" height="20" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
          <ellipse cx="0" cy="26" rx="26" ry="6" fill="#0284c7"/>
          <text x="34" y="28" fill="#38bdf8" font-size="10">360°回转盘</text>

          <!-- Hydraulic Pitch Struts + Hanging Cabin -->
          <g transform="translate(0, 32) rotate(${suspSwing})">
            <line x1="-14" y1="0" x2="-20" y2="75" stroke="#f59e0b" stroke-width="4"/>
            <line x1="14" y1="0" x2="20" y2="75" stroke="#f59e0b" stroke-width="4"/>
            <text x="24" y="45" fill="#f59e0b" font-size="10">液压俯仰吊杆 (无大小臂)</text>
            <rect x="-42" y="75" width="84" height="46" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2.5"/>
            <text x="-32" y="102" fill="#f1f5f9" font-size="11" font-weight="bold">8人悬挂动感舱</text>
          </g>
        </g>
        <text x="450" y="325" fill="#94a3b8" font-size="11">地面完全腾空（仅布置火焰山炼丹炉实景与 3D 巨幕，无地面轨道）</text>
      </svg>`;
    }

    if (m === 1) {
      // SCOOP 6-DOF vs EMV 12-seat Jeep
      const lift = (h - 50) * 0.25;
      return `
      <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
        <rect width="820" height="350" fill="#090d16"/>
        <line x1="410" y1="15" x2="410" y2="335" stroke="#334155" stroke-dasharray="6,6" stroke-width="1.5"/>

        <!-- LEFT: 1.1.2.1 SCOOP -->
        <text x="20" y="28" fill="#38bdf8" font-size="13" font-weight="bold">1.1.2.1 车载 6-DOF + 360°自转 + 3D巨幕 (蜘蛛侠/变形金刚/女娲补天)</text>
        <path d="M 30 60 Q 200 35 370 60 L 370 155 Q 200 135 30 155 Z" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="105" fill="#38bdf8" font-size="12" font-weight="bold">动态视点透视矫正 3D 巨幕 (Squinching)</text>

        <rect x="30" y="305" width="340" height="14" fill="#1e293b" stroke="#64748b"/>
        <g transform="translate(200, 305)">
          <rect x="-55" y="-22" width="110" height="22" rx="4" fill="#334155"/>
          <ellipse cx="0" cy="-26" rx="46" ry="7" fill="#a855f7"/>
          <text x="54" y="-22" fill="#a855f7" font-size="10" font-weight="bold">🔄 360°高速回转环 (核心区别)</text>
          <!-- 6-DOF Stewart Struts -->
          <g transform="translate(0, ${-68 - lift}) rotate(${p * 0.8})">
            <line x1="-36" y1="40" x2="-24" y2="0" stroke="#f59e0b" stroke-width="3"/>
            <line x1="-12" y1="40" x2="-36" y2="0" stroke="#f59e0b" stroke-width="3"/>
            <line x1="12" y1="40" x2="36" y2="0" stroke="#f59e0b" stroke-width="3"/>
            <line x1="36" y1="40" x2="24" y2="0" stroke="#f59e0b" stroke-width="3"/>
            <path d="M -58 0 L 58 0 L 48 -42 L -48 -42 Z" fill="#0284c7" stroke="#f1f5f9" stroke-width="2"/>
            <text x="-40" y="-16" fill="#fff" font-size="11" font-weight="bold">SCOOP 6-DOF 车体</text>
          </g>
        </g>

        <!-- RIGHT: 1.1.2.3 EMV Jeep -->
        <text x="430" y="28" fill="#10b981" font-size="13" font-weight="bold">1.1.2.3 12座液压越野吉普 + 纯实景古墓 (印第安纳琼斯 / 方特秦俑地宫)</text>
        <!-- Practical Terracotta / Temple Props -->
        <rect x="445" y="65" width="75" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="453" y="115" fill="#f59e0b" font-size="11">实体兵马俑</text>
        <text x="453" y="132" fill="#f59e0b" font-size="11">与巨石机关</text>
        <text x="540" y="95" fill="#94a3b8" font-size="11">❌ 不戴 3D 眼镜 · ❌ 不做 360° 陀螺自转</text>
        <text x="540" y="118" fill="#10b981" font-size="11">✅ 12座(3×4)敞篷越野吉普 + 车头探照大灯</text>

        <rect x="440" y="305" width="350" height="14" fill="#1e293b" stroke="#10b981"/>
        <g transform="translate(625, 305)">
          <rect x="-65" y="-24" width="130" height="24" rx="4" fill="#334155"/>
          <text x="-52" y="-8" fill="#cbd5e1" font-size="10">3000psi 车载液压蓄能底盘</text>
          <g transform="translate(0, ${-66 - lift}) rotate(${p * 0.95})">
            <line x1="-42" y1="42" x2="-42" y2="0" stroke="#10b981" stroke-width="5"/>
            <line x1="0" y1="42" x2="0" y2="0" stroke="#10b981" stroke-width="5"/>
            <line x1="42" y1="42" x2="42" y2="0" stroke="#10b981" stroke-width="5"/>
            <rect x="-68" y="-38" width="136" height="38" rx="6" fill="#065f46" stroke="#34d399" stroke-width="2"/>
            <!-- Headlight beam -->
            <polygon points="-68,-20 -165,-65 -165,10" fill="rgba(250,204,21,0.22)"/>
            <text x="-52" y="-14" fill="#fff" font-size="11" font-weight="bold">12座(3×4)考古越野吉普</text>
          </g>
        </g>
      </svg>`;
    }

    if (m === 2) {
      // Fangte Shenhua / Qiangu Fenghua Trackless + Multi-DOF + Tilted Dome
      const pitchDown = Math.max(-22, Math.min(22, p));
      return `
      <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
        <rect width="820" height="350" fill="#090d16"/>
        <text x="20" y="28" fill="#38bdf8" font-size="13" font-weight="bold">2.2.2 方特《神画 / 千古风华》：地面无轨多自由度车如何在《千里江山图》段实现球幕飞行影院体感？</text>

        <!-- Phase 1: Scroll Corridor -->
        <rect x="25" y="65" width="210" height="190" rx="8" fill="rgba(30,41,59,0.5)" stroke="#475569" stroke-dasharray="4,4"/>
        <text x="40" y="90" fill="#94a3b8" font-size="11" font-weight="bold">第一阶段：平地无轨编队穿行</text>
        <text x="40" y="112" fill="#cbd5e1" font-size="11">• 多层升降数字画卷走廊</text>
        <text x="40" y="132" fill="#cbd5e1" font-size="11">• RFID/光学寻迹自由分道</text>
        <path d="M 65 215 L 255 215" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4"/>
        <text x="95" y="205" fill="#38bdf8" font-size="11">驶入球幕悬崖视点 ➔</text>

        <!-- Phase 2: Cliff Platform & Giant Tilted Concave Dome -->
        <rect x="240" y="220" width="215" height="95" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        <text x="255" y="255" fill="#f59e0b" font-size="11" font-weight="bold">悬崖停靠台 (Sweet Spot)</text>
        <text x="255" y="275" fill="#94a3b8" font-size="10">车停在深坑边缘，遮蔽真实地面</text>

        <!-- Giant Tilted Concave Dome wrapping from ceiling to deep abyss -->
        <path d="M 380 35 C 660 35, 760 185, 535 335" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round"/>
        <path d="M 390 42 C 645 42, 740 185, 525 328" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,6"/>
        <text x="615" y="95" fill="#10b981" font-size="12" font-weight="bold">内凹式巨型倾斜半球幕</text>
        <text x="615" y="115" fill="#38bdf8" font-size="11">向下延伸至深渊，剥夺下视野！</text>

        <!-- Trackless + Multi-DOF Vehicle on Cliff Edge -->
        <g transform="translate(385, 220)">
          <!-- Lower Trackless AGV Chassis -->
          <rect x="-48" y="-18" width="96" height="18" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="-30" cy="-2" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="30" cy="-2" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="-44" y="-5" fill="#38bdf8" font-size="9">下层:无轨AGV底盘</text>

          <!-- Upper Multi-DOF Motion Platform pitching forward into the dome -->
          <g transform="translate(0, -22) rotate(${pitchDown})">
            <line x1="-28" y1="4" x2="-22" y2="-18" stroke="#f59e0b" stroke-width="4"/>
            <line x1="28" y1="4" x2="22" y2="-18" stroke="#f59e0b" stroke-width="4"/>
            <rect x="-46" y="-44" width="92" height="26" rx="6" fill="#0284c7" stroke="#f1f5f9" stroke-width="2"/>
            <text x="-40" y="-27" fill="#fff" font-size="10" font-weight="bold">上层:多自由度座舱</text>
            <!-- FOV Cone filling 180 deg -->
            <polygon points="46,-32 245,-145 235,95" fill="rgba(16,185,129,0.16)" stroke="#10b981" stroke-dasharray="4,4"/>
          </g>
        </g>
        <text x="480" y="295" fill="#f59e0b" font-size="11" font-weight="bold">💨 球幕底部迎面冷风机 + 水雾 + 3D航拍光流 (Vection)</text>
      </svg>`;
    }

    if (m === 3) {
      // Shanghai Pirates Underwater LSM Boat vs Futuroscope Mack Rocking Boat
      return `
      <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
        <rect width="820" height="350" fill="#090d16"/>
        <line x1="410" y1="15" x2="410" y2="335" stroke="#334155" stroke-dasharray="6,6" stroke-width="1.5"/>

        <!-- Water Surface Line -->
        <path d="M 15 175 Q 200 168 400 175 T 805 175" fill="none" stroke="#06b6d4" stroke-width="3"/>
        <rect x="15" y="175" width="790" height="155" fill="rgba(6,182,212,0.08)"/>
        <text x="25" y="195" fill="#06b6d4" font-size="11">🌊 真实水面 (游客以为船只是自由漂浮，实则水下藏有重型机械导轨)</text>

        <!-- LEFT: 5.1.3.1 Shanghai Pirates -->
        <text x="20" y="28" fill="#38bdf8" font-size="13" font-weight="bold">5.1.3.1 上海迪士尼《加勒比海盗》：水下 LSM 直线电机全向自转船</text>
        <rect x="45" y="295" width="320" height="16" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
        <text x="65" y="325" fill="#f59e0b" font-size="11" font-weight="bold">⚡ 水底刚性变轨钢轨 + 直线电机 (LSM) 滑块</text>

        <g transform="translate(${200 + (h - 50) * 0.8}, 295)">
          <rect x="-38" y="-24" width="76" height="24" rx="4" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
          <rect x="-10" y="-120" width="20" height="96" fill="#64748b"/>
          <ellipse cx="0" cy="-75" rx="28" ry="8" fill="#a855f7"/>
          <text x="34" y="-72" fill="#a855f7" font-size="10" font-weight="bold">🔄 水下360°伺服旋转立柱</text>
          <!-- 30-pax Pirate Ship on Surface -->
          <g transform="translate(0, -130) rotate(${y * 0.3})">
            <path d="M -75 -25 L 75 -25 L 55 15 L -55 15 Z" fill="#7c2d12" stroke="#fbbf24" stroke-width="2"/>
            <text x="-52" y="-2" fill="#fef3c7" font-size="11" font-weight="bold">30人海盗船 (自转/横移/倒退)</text>
          </g>
        </g>

        <!-- RIGHT: 5.1.3.2 Mack Rocking Boat -->
        <text x="430" y="28" fill="#10b981" font-size="13" font-weight="bold">5.1.3.2 法国《百慕大任务》：Mack 水下万向球铰主动摇摆快艇</text>
        <rect x="445" y="295" width="330" height="16" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="465" y="325" fill="#10b981" font-size="11" font-weight="bold">⚡ 水底导轨轮架 + 万向球铰主动俯仰横滚支撑臂</text>

        <g transform="translate(${610 + (h - 50) * 0.8}, 295)">
          <rect x="-36" y="-22" width="72" height="22" rx="4" fill="#334155" stroke="#10b981" stroke-width="2"/>
          <line x1="0" y1="-22" x2="0" y2="-115" stroke="#10b981" stroke-width="6"/>
          <circle cx="0" cy="-115" r="10" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
          <text x="16" y="-85" fill="#f59e0b" font-size="10" font-weight="bold">万向球铰 + 主动俯仰横滚油缸</text>
          <!-- Rocking Boat pitching & rolling wildly -->
          <g transform="translate(0, -130) rotate(${p * 1.1 + r * 0.6})">
            <path d="M -68 -22 L 68 -22 L 50 14 L -50 14 Z" fill="#065f46" stroke="#34d399" stroke-width="2.5"/>
            <text x="-52" y="-2" fill="#fff" font-size="11" font-weight="bold">Rocking Boat (翘头俯仰+剧烈横滚)</text>
          </g>
        </g>
      </svg>`;
    }

    if (m === 4) {
      // T3.1 Danse Macabre vs T2.5 Hypersphere 360
      return `
      <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
        <rect width="820" height="350" fill="#090d16"/>
        <line x1="410" y1="15" x2="410" y2="335" stroke="#334155" stroke-dasharray="6,6" stroke-width="1.5"/>

        <!-- LEFT: T3.1 Danse Macabre Dynamic Motion Stage -->
        <text x="20" y="28" fill="#38bdf8" font-size="13" font-weight="bold">T3.1 Efteling《骷髅之舞》：18米倾斜升降主转盘 + 6子转盘</text>
        <g transform="translate(205, 215)">
          <rect x="-45" y="55" width="90" height="35" rx="4" fill="#1e293b" stroke="#64748b"/>
          <line x1="-22" y1="55" x2="-15" y2="${-15 - (h - 50) * 0.3}" stroke="#f59e0b" stroke-width="6"/>
          <line x1="22" y1="55" x2="15" y2="${-15 - (h - 50) * 0.3}" stroke="#f59e0b" stroke-width="6"/>
          <g transform="translate(0, ${-20 - (h - 50) * 0.3}) rotate(${p * 0.9})">
            <ellipse cx="0" cy="0" rx="145" ry="36" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
            <ellipse cx="-85" cy="-4" rx="28" ry="10" fill="#a855f7" stroke="#fff"/>
            <ellipse cx="0" cy="-12" rx="28" ry="10" fill="#a855f7" stroke="#fff"/>
            <ellipse cx="85" cy="-4" rx="28" ry="10" fill="#a855f7" stroke="#fff"/>
            <text x="-95" y="24" fill="#38bdf8" font-size="11" font-weight="bold">18米主转盘 (27km/h旋转+倾斜) + 6个自转唱诗班子转盘</text>
          </g>
        </g>

        <!-- RIGHT: T2.5 Hypersphere 360 -->
        <text x="430" y="28" fill="#10b981" font-size="13" font-weight="bold">T2.5 阿布扎比《Hypersphere 360°》：360°全封闭LED球体悬挂环</text>
        <g transform="translate(615, 185)">
          <circle cx="0" cy="0" r="125" fill="rgba(16,185,129,0.07)" stroke="#10b981" stroke-width="4" stroke-dasharray="10,4"/>
          <text x="-75" y="-95" fill="#10b981" font-size="11" font-weight="bold">直径17米 360°全封闭微间距LED球体</text>
          <text x="-72" y="108" fill="#f59e0b" font-size="11" font-weight="bold">⚠️ 脚下无地板遮挡！连脚底深渊都是球幕</text>
          <line x1="0" y1="-125" x2="0" y2="-35" stroke="#64748b" stroke-width="5"/>
          <g transform="rotate(${r * 1.1})">
            <ellipse cx="0" cy="0" rx="68" ry="18" fill="none" stroke="#38bdf8" stroke-width="6"/>
            <circle cx="-45" cy="4" r="6" fill="#f59e0b"/>
            <circle cx="0" cy="8" r="6" fill="#f59e0b"/>
            <circle cx="45" cy="4" r="6" fill="#f59e0b"/>
          </g>
        </g>
      </svg>`;
    }

    // Mode 5: 4 Flying Theater Entry Mechanisms (T1.1 ~ T1.4)
    const prog = h / 100; // 0.0 to 1.0
    return `
    <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="350" fill="#090d16"/>
      <line x1="205" y1="15" x2="205" y2="335" stroke="#1e293b" stroke-width="1.5"/>
      <line x1="410" y1="15" x2="410" y2="335" stroke="#1e293b" stroke-width="1.5"/>
      <line x1="615" y1="15" x2="615" y2="335" stroke="#1e293b" stroke-width="1.5"/>

      <!-- 1. T1.1 Disney Soarin' -->
      <text x="15" y="26" fill="#38bdf8" font-size="12" font-weight="bold">T1.1 顶置钢缆提拉 (迪士尼翱翔)</text>
      <path d="M 145 45 C 195 110, 195 240, 145 305" fill="none" stroke="#38bdf8" stroke-width="4"/>
      <g transform="translate(${45 + prog * 65}, ${245 - prog * 135})">
        <rect x="0" y="0" width="26" height="16" rx="3" fill="#0284c7"/>
        <rect x="0" y="${30 * prog}" width="26" height="16" rx="3" fill="#0284c7"/>
        <rect x="0" y="${60 * prog}" width="26" height="16" rx="3" fill="#0284c7"/>
        <line x1="13" y1="-45" x2="13" y2="${60 * prog}" stroke="#f59e0b" stroke-width="2"/>
      </g>
      <text x="15" y="328" fill="#94a3b8" font-size="10">平地入座 → 钢缆向上提拉拼成3层</text>

      <!-- 2. T1.2 Brogent i-Ride / Fantawild -->
      <text x="220" y="26" fill="#10b981" font-size="12" font-weight="bold">T1.2 多层水平前推 (方特伴你飞翔)</text>
      <path d="M 355 45 C 400 110, 400 240, 355 305" fill="none" stroke="#10b981" stroke-width="4"/>
      <line x1="225" y1="100" x2="290" y2="100" stroke="#475569" stroke-width="3"/>
      <line x1="225" y1="175" x2="290" y2="175" stroke="#475569" stroke-width="3"/>
      <line x1="225" y1="250" x2="290" y2="250" stroke="#475569" stroke-width="3"/>
      <g transform="translate(${prog * 52}, 0)">
        <rect x="265" y="82" width="24" height="16" rx="3" fill="#10b981"/>
        <rect x="265" y="157" width="24" height="16" rx="3" fill="#10b981"/>
        <rect x="265" y="232" width="24" height="16" rx="3" fill="#10b981"/>
      </g>
      <text x="220" y="328" fill="#94a3b8" font-size="10">3层楼板入座 → 悬臂水平前推入球</text>

      <!-- 3. T1.3 Vertical Cage Lift -->
      <text x="425" y="26" fill="#f59e0b" font-size="12" font-weight="bold">T1.3 巨型钢架拉升 (方特飞越极限)</text>
      <path d="M 560 45 C 605 110, 605 240, 560 305" fill="none" stroke="#f59e0b" stroke-width="4"/>
      <g transform="translate(${455 + prog * 45}, ${185 - prog * 95})">
        <rect x="0" y="0" width="38" height="110" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
        <rect x="6" y="10" width="26" height="16" fill="#d97706"/>
        <rect x="6" y="45" width="26" height="16" fill="#d97706"/>
        <rect x="6" y="80" width="26" height="16" fill="#d97706"/>
      </g>
      <text x="425" y="328" fill="#94a3b8" font-size="10">百人钢铁笼架整体垂直拉升十余米</text>

      <!-- 4. T1.4 90-deg Tilting Deck -->
      <text x="630" y="26" fill="#a855f7" font-size="12" font-weight="bold">T1.4 平地入座90°竖立 (非凡之旅)</text>
      <path d="M 760 45 C 805 110, 805 240, 760 305" fill="none" stroke="#a855f7" stroke-width="4"/>
      <g transform="translate(715, 265) rotate(${-prog * 90})">
        <rect x="-85" y="-8" width="95" height="8" rx="3" fill="#a855f7"/>
        <rect x="-75" y="-26" width="18" height="18" rx="3" fill="#38bdf8"/>
        <rect x="-45" y="-26" width="18" height="18" rx="3" fill="#38bdf8"/>
        <rect x="-15" y="-26" width="18" height="18" rx="3" fill="#38bdf8"/>
      </g>
      <text x="630" y="328" fill="#94a3b8" font-size="10">平地单层入座 → 90吨地板向上90°竖立</text>
    </svg>`;
  }
};
