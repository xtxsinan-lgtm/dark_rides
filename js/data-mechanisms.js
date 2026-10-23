/*
  Mechanism taxonomy.
  Branch nodes: { code, title, children }
  Leaf nodes:   { code, short, title, en, support, dof, mfg, text, demo?, demoNote?, parks: [[label, items]] }
  Depth varies (2–4 levels) on purpose: deeper only where the engineering actually branches.
*/
window.MECH = {
  parts: [
    {
      id: "ride",
      label: "行进式",
      title: "行进式 Dark Ride",
      note: "载具带着乘客在不同场景之间真实移动。按载具的支撑与导引方式分为五大门类。",
      cats: [
        {
          key: "c1",
          num: "I",
          title: "地面水平有轨",
          en: "Floor-tracked",
          desc: "以地面导轨与导电母线支撑、导引载具。按是否有座舱分为两支；有座舱的一支，再按车上机构的自由度由低到高细分。",
          children: [
            {
              code: "1.1",
              title: "有座舱地面导轨车",
              children: [
                {
                  code: "1.1.1",
                  title: "固定或单轴旋转座舱（0–1 自由度）",
                  children: [
                    {
                      code: "1.1.1.1",
                      short: "传统有轨小车",
                      title: "间歇发车的传统地面有轨小车",
                      en: "Conventional tracked car",
                      support: "地面导轨与导电母线",
                      dof: "沿轨平移；部分车型可水平自转",
                      mfg: "WDI、ETF、Mack Rides、华强方特等",
                      text: "车辆分批发车，沿地面导轨行驶。座舱朝向固定，或可由电机、乘客转动的方向盘带动水平旋转。结构简单，是最古老也最常见的暗黑乘骑形式。",
                      parks: [
                        ["迪士尼", "《白雪公主》《匹诺曹》《蟾蜍先生狂野之旅》《爱丽丝梦游仙境》《小熊维尼历险记》《兔子罗杰卡通转转车》《怪兽电力公司：大营救》"],
                        ["环球影城", "奥兰多冒险岛《帽子里的猫》"],
                        ["方特", "安阳《怪奇公馆》、熊出没乐园《玩具屋大冒险》"],
                        ["默林集团", "Alton Towers《Gangsta Granny: The Ride》；Heide Park《Dämonen Gruft》（2024）"],
                        ["六旗与雪松会", "诺氏百乐坊《Calico Mine Ride》（1960 假山暗黑火车鼻祖）；雪松点历史名作《Pirate Ride》《Earthquake》"],
                        ["欧洲名园", "意大利 Movieland《Pangea》（游客手握方向盘自驾真吉普）；瑞典 Liseberg《Underlandet》（含终点垂直升降电梯）"],
                        ["迪拜与阿布扎比", "Motiongate《蓝精灵工作室之旅》《史瑞克童话之旅》；IMG《失落谷：恐龙禁区》"],
                        ["欧洲四园", "Futuroscope《疯狂兔子时光机》；Europa-Park《白雪公主雪橇之旅》《Piccolo Mondo》"]
                      ]
                    },
                    {
                      code: "1.1.1.2",
                      short: "Omnimover 连续车链",
                      title: "连续匀速移动的全向车链（Omnimover）",
                      en: "Omnimover",
                      support: "首尾相连的连续车链",
                      dof: "约 0.6 m/s 连续平移 + 轨道强制水平转向",
                      mfg: "WDI、Arrow、Mack Rides、Schwarzkopf",
                      text: "上百节车厢首尾相连、永不停车，吞吐量很高。轨道上的凸轮或伺服机构强制车厢转向，高靠背遮住相邻车辆，像摄影机一样替乘客决定看什么。",
                      parks: [
                        ["迪士尼", "《幽灵公馆》/《幻影庄园》《小美人鱼：海底之旅》《地球太空船》《海底总动员：尼莫与朋友们》《幻想之旅》"],
                        ["环球影城", "好莱坞《爱宠大机密：脱离皮带》；日本与史诗宇宙《耀西的冒险》"],
                        ["默林集团", "Alton Towers《奥尔顿庄园的诅咒》（Mack 分区变速连续发车系统）；Thorpe Park 历史名作《Wicked Witches Haunt》"],
                        ["欧洲四园", "Phantasialand《幽灵人力车》；Efteling《狂欢节》；Europa-Park《美第奇城堡》《弗洛伊登赖希夫人的奇珍馆》"]
                      ]
                    },
                    {
                      code: "1.1.1.3",
                      short: "旋转车 + 射击互动",
                      title: "有轨旋转底盘 + 射击与互动系统",
                      en: "Interactive tracked ride",
                      support: "地面单轨或双轨",
                      dof: "沿轨平移 + 手动或程序控制的快速水平旋转",
                      mfg: "WDI、ETF、Mack、Triotech、Alterface、Sally、华强方特、华侨城文旅科技",
                      text: "车厢可手动或自动快速转向，配合激光枪、弹簧发射器、手电筒、手势识别或 AR 护目镜等交互方式，射击实景靶点或 3D 屏幕里的目标。",
                      parks: [
                        ["迪士尼", "《巴斯光年》系列、香港《蚁人与黄蜂女：击战特攻！》、《玩具总动员疯狂游戏屋》、东京《怪兽电力公司“迷藏巡游车”》、《蜘蛛侠大冒险》"],
                        ["环球影城", "《马力欧卡丁车：库巴的挑战》、奥兰多《黑衣人：外星人攻击》"],
                        ["方特", "《熊出没历险记》《神枪手》《百发百中》《宇宙小勇士》、自贡《丛林卫士》、青岛《小鸡不好惹之大反击》"],
                        ["长隆与华侨城", "长隆宇宙飞船《深海奇遇》；深圳/上海/成都欢乐谷《北极探险》（Sally）、重庆欢乐谷《洪崖洞传说》、武汉欢乐谷《魔幻奇兵》"],
                        ["默林集团", "全球乐高乐园《乐高幻影忍者》（Triotech 隔空手势发射）与《失落王国历险记》（Sally）；Chessington《古墓神枪手》；Heide Park《捉鬼敢死队 5D》"],
                        ["六旗与雪松会", "国王岛/国王领地/卡罗温兹/加拿大奇幻乐园《嘘嘘山幽灵猎手 (Boo Blasters)》；诺氏百乐坊《诺氏小熊传说》；德州嘉年华六旗《深海海盗》"],
                        ["迪拜与阿布扎比", "华纳兄弟世界《乐一通大混乱》、法拉利世界《本诺的大赛》、迪拜乐高乐园《幻影忍者》"],
                        ["云顶天城", "《博物馆奇妙夜：午夜大混乱》"],
                        ["欧洲四园", "Phantasialand《巧克力大冒险》、Europa-Park《亚特兰蒂斯历险》"]
                      ]
                    },
                    {
                      code: "1.1.1.4",
                      short: "普通车 + 局部动感轨段",
                      title: "普通有轨车 + 局部动感轨段",
                      en: "Passive car on a motion bridge",
                      support: "地面导轨，个别轨段架在液压平台上",
                      dof: "车辆本身仅可旋转；动感来自房间里的轨段平台",
                      mfg: "Mack Rides",
                      text: "车辆本身没有动感机构，但个别房间的一段轨道架在液压平台上。车开上去锁定后，平台带着轨道和车辆一起颠簸——用较低的成本换来局部的动感体验。",
                      parks: [["欧洲四园", "Europa-Park《斯诺里之旅》"]]
                    }
                  ]
                },
                {
                  code: "1.1.2",
                  title: "车载多自由度动感平台（3–6 自由度）",
                  children: [
                    {
                      code: "1.1.2.1",
                      short: "车载六自由度 + 3D 屏幕",
                      title: "车载六自由度平台 + 360° 旋转 + 3D 屏幕",
                      en: "Motion-base vehicle with 3D media",
                      support: "地面隐藏导轨",
                      dof: "六自由度运动平台 + 360° 水平旋转",
                      mfg: "Oceaneering、华强方特",
                      text: "每辆车背着一套六自由度运动平台和可旋转的座舱，在多块 3D 屏幕与实景之间穿行。屏幕画面按车辆位置实时校正透视，配合平台的俯仰与旋转，制造坠落、飞驰等体感。",
                      demo: "CySHvb_4fHk",
                      demoNote: "Oceaneering EVO-6 展会演示",
                      parks: [
                        ["环球影城", "奥兰多《蜘蛛侠惊魂历险记》；《变形金刚：火种源之战》（好莱坞、奥兰多、新加坡、北京）；北京《侏罗纪世界大冒险》"],
                        ["迪士尼", "东京迪士尼海洋《小飞侠梦幻岛历险记》"],
                        ["方特", "《女娲补天》《恐龙危机》《魔法城堡》《哪吒闹海》（东方神画动感车版）《突围》《铁道游击》《封神》《拉玛传奇》《丝路奇遇》《地心历险》《古蜀历险》《勇者之城》"],
                        ["华侨城", "东部华侨城《地心四千哩》；襄阳奇幻谷《超时空营救（地心历险）》；成都欢乐谷《熊猫侠》；天津欢乐谷《3D 圣诞历险记》；卡乐星球《时光飞车》《疯狂魔术师》"],
                        ["默林集团", "意大利 Gardaland《勇敢者游戏：丛林历险 (Jumanji – The Adventure)》（Oceaneering 6-DOF 越野车）"],
                        ["六旗与雪松会", "7 座六旗乐园《正义联盟：大都会之战 (Justice League: Battle for Metropolis)》（Oceaneering 6-DOF + Sally 互动射击）"],
                        ["迪拜与阿布扎比", "华纳兄弟世界《正义联盟：战争世界攻击》；IMG《复仇者联盟：奥创之战》"],
                        ["云顶天城", "《猩球崛起：入侵》"]
                      ]
                    },
                    {
                      code: "1.1.2.2",
                      short: "车载升降 + 动感座舱",
                      title: "车载大行程升降机构 + 多自由度座舱",
                      en: "Elevating motion-base vehicle",
                      support: "地面导轨",
                      dof: "沿轨平移 + 数米垂直升降 + 座舱多自由度",
                      mfg: "Simtec Systems",
                      text: "在地面底盘与动感座舱之间加入一套大行程升降机构，车厢可以在行驶中真实地升起、落下，用来模拟魔法部的“飞天电梯”。",
                      parks: [["环球影城", "史诗宇宙《哈利·波特与魔法部之战》"]]
                    },
                    {
                      code: "1.1.2.3",
                      short: "越野吉普（EMV）",
                      title: "车载多自由度越野吉普（EMV 路线）",
                      en: "Enhanced Motion Vehicle",
                      support: "地面导轨",
                      dof: "车身俯仰、侧倾、升降；不做 360° 旋转",
                      mfg: "WDI、华强方特",
                      text: "以迪士尼 EMV 为代表：12 座敞篷越野车的悬挂由液压控制，模拟崎岖路面的颠簸、急刹和下坠。乘客不戴 3D 眼镜，车头始终朝前，惊险来自实景与机关。",
                      parks: [
                        ["迪士尼", "加州与东京《印第安纳琼斯冒险旅程》；动物王国《恐龙》"],
                        ["方特", "青岛《秦俑地宫》；芜湖、厦门、株洲梦幻王国的 12 座吉普版《秦陵历险》（与一期看台版是不同设备）"]
                      ]
                    }
                  ]
                },
                {
                  code: "1.1.3",
                  title: "车载多轴工业机械臂",
                  children: [
                    {
                      code: "1.1.3.1",
                      short: "地面轨道 + 六轴机械臂",
                      title: "地面轨道 + 六轴串联工业机械臂",
                      en: "Floor-tracked robotic arm",
                      support: "地面导轨上的配重底盘",
                      dof: "底盘平移 + 机械臂六轴运动（大幅升降、近乎平躺）",
                      mfg: "KUKA、Dynamic Structures",
                      text: "底盘沿地面轨道匀速行驶，上方的六轴机械臂从椅背后方举着一排座椅，可以伸缩、抬升、近乎平躺。轨道被黑色地台遮住，所以常被误认为是悬挂在天花板上的系统。",
                      demo: "2_SEJHxlmWw",
                      demoNote: "KUKA RoboCoaster 展会演示",
                      parks: [["环球影城", "《哈利·波特与禁忌之旅》（奥兰多、好莱坞、日本、北京）；史诗宇宙《科学怪人：怪物大暴走》"]]
                    },
                    {
                      code: "1.1.3.2",
                      short: "高速底盘 + 机械悬臂",
                      title: "高速底盘 + 多自由度机械悬臂",
                      en: "High-speed robotic vehicle",
                      support: "地面高速导轨",
                      dof: "底盘快速加减速 + 座舱大角度俯仰、侧倾",
                      mfg: "Dynamic Attractions",
                      text: "把机械臂式座舱装在能快速冲刺的底盘上，突破了机械臂底盘只能慢速匀行的限制。",
                      parks: [["迪拜与阿布扎比", "华纳兄弟世界《蝙蝠侠：暗夜飞行》"]]
                    }
                  ]
                },
                {
                  code: "1.1.4",
                  title: "慢速叙事 + 高速段的跨界系统",
                  children: [
                    {
                      code: "1.1.4.1",
                      short: "慢速叙事 + 槽轨竞速",
                      title: "室内慢速叙事 + 室外高速槽轨车",
                      en: "Slot-car hybrid",
                      support: "地面槽轨与供电母线",
                      dof: "从步行速度到高速竞速",
                      mfg: "WDI",
                      text: "地面开槽导向并供电。前半段在室内慢速看机械人偶，后半段驶出室外加速，甚至两车并排竞速。",
                      parks: [["迪士尼", "加州冒险乐园《汽车总动员：水箱温泉镇赛车手》；东京迪士尼海洋《地心探险之旅》；EPCOT《测试赛道》"]]
                    },
                    {
                      code: "1.1.4.2",
                      short: "动感底盘叙事过山车",
                      title: "车载旋转/俯仰底盘 + 特种轨段的叙事过山车",
                      en: "Story coaster with motion base",
                      support: "过山车钢轨 + 可倾斜、可横移的特种轨段",
                      dof: "车厢受控旋转或俯仰 + 轨段倾斜、横移",
                      mfg: "Intamin、Vekoma、Dynamic Attractions",
                      text: "在过山车轨道上加入车载旋转或俯仰机构，配合可倾斜、可横移的特种轨段和多块屏幕，大半程用来讲故事，而不只是追求速度。",
                      parks: [
                        ["环球影城", "奥兰多《哈利·波特与逃离古灵阁》"],
                        ["迪士尼", "EPCOT《银河护卫队：宇宙倒带》"],
                        ["欧洲名园", "西班牙冒险港 PortAventura《神秘海域：苦修之谜 (Uncharted: The Enigma of Penitence)》（Intamin 五次弹射受控旋转 + 侧向滑轨与跌落轨）"],
                        ["华侨城", "常德卡乐星球《圣诞奇兵》（车载动感 + 垂直电梯提升 + 变轨滑台）"],
                        ["迪拜与阿布扎比", "法拉利世界《法拉利使命》"]
                      ]
                    },
                    {
                      code: "1.1.4.3",
                      short: "半程暗黑 + 半程过山车",
                      title: "半程慢速暗黑乘骑 + 半程过山车",
                      en: "Half dark ride, half coaster",
                      support: "同一条轨道上的慢速段与发射或下坡段",
                      dof: "慢速巡游 → 高速过山车",
                      mfg: "Premier Rides、Vekoma、Intamin、ART Engineering、华强方特",
                      text: "前半段是完整的慢速暗黑乘骑，经过多个布景房间；之后换轨、发射或下坡，进入过山车段。这里只收录有独立暗黑叙事段的项目。",
                      parks: [
                        ["环球影城", "《木乃伊复仇记》（奥兰多、好莱坞、新加坡）"],
                        ["迪士尼", "《七个小矮人矿山车》（神奇王国、上海）"],
                        ["方特", "东方神画《惊魂之旅》/《灵魂之旅》"],
                        ["默林集团", "全球 11 座乐高乐园《飞龙过山车 (The Dragon)》；Alton Towers《TH13TEEN》（地下古墓垂直自由落体跌落轨）；Thorpe Park《X》"],
                        ["六旗与雪松会", "加拿大奇幻乐园《奇幻山守护者 (Wonder Mountain's Guardian)》（山体内部 150 米 3D 互动射击过山车 + 结尾 9 米垂直自由落体跌落轨）；六旗《黑暗骑士过山车》《骷髅山》；国王岛《冒险快车》《恐惧飞行》；雪松点历史传奇《灾难运输号》"],
                        ["华侨城", "襄阳奇幻谷《雪山飞车》（含室内冰洞变轨倒退段）；上海欢乐谷《矿山历险》；天津欢乐谷《火山探险》"]
                      ]
                    }
                  ]
                }
              ]
            },
            {
              code: "1.2",
              short: "无座舱移动步道",
              title: "无座舱的连续移动步道",
              en: "Moving walkway",
              support: "地面连续移动步道",
              dof: "站立匀速平移",
              mfg: "—",
              text: "去掉车厢与座椅，乘客站在蜿蜒的移动步道上穿过各个场景，双手空出来专心互动射击。",
              parks: [["环球影城", "奥兰多《小黄人恶人大会》"]]
            }
          ]
        },
        {
          key: "c2",
          num: "II",
          title: "地面无轨",
          en: "Trackless",
          desc: "没有物理轨道，车载电池供电，依靠地面信标、磁钉或激光等方式定位导航。按车上机构的复杂程度递进。",
          children: [
            {
              code: "2.1",
              short: "平层无轨车",
              title: "平层无轨车：多车编队与分路线",
              en: "Planar trackless",
              support: "平整地面 + 定位导航",
              dof: "平面自由移动 + 原地旋转",
              mfg: "WDI、Oceaneering、ETF Ride Systems",
              text: "车辆在平面上自由走位：多车编队共舞、分头进入不同房间，甚至让乘客自选路线，打破了有轨车只能按顺序讲故事的限制。",
              demo: "dzSVhAota8w",
              demoNote: "ETF Multi Mover 系统介绍",
              parks: [
                ["迪士尼", "香港《迷离大宅》；东京《小熊维尼猎蜜记》《水逗船》；巴黎与 EPCOT《料理鼠王》；《米奇与米妮的逃亡铁路》"],
                ["方特", "南宁《相约下龙湾》、安阳《殷商往事》"],
                ["默林集团", "纽约与韩国乐高乐园《乐高工厂奇幻之旅 (LEGO Factory Adventure)》（ETF 无轨车 + 实时把乘客扫描成乐高小人仔）"],
                ["欧洲名园", "西班牙冒险港 PortAventura《芝麻街：曲奇神探任务 (Street Mission)》（ETF 埋线导引 + Sally 互动射击）"],
                ["迪拜与阿布扎比", "Motiongate《精灵旅社》；华纳兄弟世界《史酷比神秘博物馆》"],
                ["云顶天城", "《冰川时代：薄冰远征》"],
                ["欧洲四园", "Efteling《幻想宫殿》"]
              ]
            },
            {
              code: "2.2",
              title: "无轨底盘 + 车载动感平台",
              children: [
                {
                  code: "2.2.1",
                  short: "无轨 + 动感平台",
                  title: "无轨底盘 + 车载动感平台",
                  en: "Trackless motion-base vehicle",
                  support: "无轨底盘",
                  dof: "平面移动 + 俯仰、侧倾、起伏",
                  mfg: "WDI、Oceaneering",
                  text: "在无轨底盘上再叠加一套动感机构，车辆既能自由走位，又能随音乐起伏，或模拟打滑、甩尾。",
                  demo: "Fm_bQf6zYKU",
                  demoNote: "Oceaneering Revolution 无轨系统介绍",
                  parks: [
                    ["迪士尼", "东京《美女与野兽“魔法奇缘”》；上海《疯狂动物城：热力追踪》"],
                    ["其他", "奥兰多海洋世界《南极洲：企鹅帝国》"]
                  ]
                },
                {
                  code: "2.2.2",
                  short: "无轨动感 + 倾斜球幕",
                  title: "无轨动感车 + 倾斜球幕或环幕",
                  en: "Trackless motion-base with tilted dome",
                  support: "无轨底盘 + 球幕边缘的停靠位",
                  dof: "平面移动 + 大角度前倾、侧倾",
                  mfg: "华强方特",
                  text: "无轨动感车驶到倾斜球幕的边缘停下，球幕向下延伸、遮住地面，车身随航拍画面前倾、侧倾，再配合风与水雾——不必悬空，也能做出飞行影院般的体感。",
                  parks: [["方特", "《神画》（太原、绵阳、鹰潭）、《千古风华》（宁波、荆州、邯郸）、资阳《石窟奇遇》、荆州《火烧赤壁》、《魅力戏曲》/《梨园游记》"]]
                }
              ]
            },
            {
              code: "2.3",
              short: "无轨 + 自由落体",
              title: "无轨车 + 垂直自由落体",
              en: "Trackless with vertical drop",
              support: "多层楼面 + 升降井道",
              dof: "平面移动 + 整车垂直下落",
              mfg: "WDI",
              text: "无轨车不仅在平地行驶，还能整车驶入升降机，连人带车从高处下落，再在另一层继续前进。",
              parks: [["迪士尼", "好莱坞影城与加州迪士尼乐园《星球大战：抵抗组织崛起》"]]
            }
          ]
        },
        {
          key: "c3",
          num: "III",
          title: "顶部悬挂",
          en: "Overhead suspended",
          desc: "轨道架在天花板上，车厢吊在轨道下方，地面完全空出来留给布景。按吊舱的速度与自由度递进。",
          children: [
            {
              code: "3.1",
              short: "单轨悬挂",
              title: "恒速或变速的单轨悬挂",
              en: "Overhead monorail",
              support: "天花板单轨",
              dof: "沿轨平移，转弯时自然摆动",
              mfg: "WDI、Mack Rides、Zamperla",
              text: "吊舱挂在头顶的轨道下，从微缩布景上方飞过。东京《海底两万里》更进一步：潜艇挂在干燥的场馆里，舷窗夹层注水、打气泡，伪装成深海。",
              parks: [
                ["迪士尼", "《小飞侠天空奇遇》（多个园区）；东京迪士尼海洋《海底两万里》"],
                ["环球影城", "奥兰多《E.T. 外星人历险记》；新加坡《芝麻街意大利面太空追逐》"],
                ["长隆", "珠海长隆海洋王国《海底互动船》（顶部悬挂车链直接穿入真实鲸鲨水族箱）；长隆宇宙飞船《海洋单轨车》"],
                ["默林集团", "Chessington《古墓神枪手 (Tomb Blaster)》（顶部单轨悬挂 5 节编组列车）"],
                ["欧洲名园", "瑞典 Liseberg 历史经典《童话城堡 (Sagoslottet)》"],
                ["云顶天城", "《机器人历险记：大焊先生飞艇》"]
              ]
            },
            {
              code: "3.2",
              short: "螺旋下降吊舱",
              title: "变速、螺旋下降的悬挂吊舱",
              en: "Spiral swinging cabin",
              support: "顶部变速轨道 + 螺旋段",
              dof: "慢速巡游 + 螺旋盘旋下降",
              mfg: "—",
              text: "吊舱先慢速飘过场景，最后沿螺旋轨道盘旋而下，离心力让吊舱向外摆出。",
              parks: [["欧洲四园", "Efteling《梦境飞行》"]]
            },
            {
              code: "3.3",
              short: "悬挂多自由度座舱",
              title: "顶部悬挂的多自由度座舱",
              en: "Suspended motion cabin",
              support: "天花板重型轨道 + 回转支承与液压连杆",
              dof: "沿轨平移 + 水平旋转 + 大幅前后翻仰",
              mfg: "华强方特",
              text: "座舱吊在天花板轨道下，通过回转支承和液压连杆做大幅度的翻仰与旋转，重心始终在轨道正下方。它没有机械臂那样的大小臂，与《禁忌之旅》是两种结构。",
              parks: [["方特", "《烈焰风云》/《火焰山》/《穿越火焰山》（十余个园区）"]]
            },
            {
              code: "3.4",
              short: "悬挂动力 + 高速飞行",
              title: "自带动力的悬挂车辆：慢速看景 + 高速飞行",
              en: "Inverted powered ride",
              support: "天花板过山车轨道 + 车载驱动",
              dof: "大范围调速 + 吊舱受控旋转（或翻转为趴姿）",
              mfg: "Mack Rides、Vekoma",
              text: "车辆自带驱动，可以在室内以很慢的速度转向看布景，也能随时加速飞行。F.L.Y. 则在暗黑段之后把座椅翻成趴姿再弹射。",
              parks: [
                ["欧洲四园", "Europa-Park《亚瑟》；Phantasialand《F.L.Y.》"],
                ["迪拜与阿布扎比", "Motiongate《驯龙高手：飞龙滑翔机》"]
              ]
            }
          ]
        },
        {
          key: "c4",
          num: "IV",
          title: "垂直井道",
          en: "Vertical shaft",
          desc: "以垂直电梯井道为主要导引方向，在多层高度上分幕讲故事，并加入受控的升降与下落。",
          children: [
            {
              code: "4.1",
              short: "井道 + 水平走廊",
              title: "垂直井道 + 水平走廊的三维路线",
              en: "Shaft with horizontal corridor",
              support: "两条垂直井道 + 一段水平走廊",
              dof: "垂直升降 + 水平行驶 + 下落",
              mfg: "WDI",
              text: "电梯厢先沿井道上升，在“第五维度”楼层离开井道、水平驶过一段走廊，再进入另一条井道完成下落。",
              parks: [["迪士尼", "好莱坞影城《暮光之城：惊魂古塔》（奥兰多原版）"]]
            },
            {
              code: "4.2",
              short: "多层开门 / 环绕屏幕",
              title: "单井道的多层开门或环绕屏幕叙事升降",
              en: "Story drop tower",
              support: "单条垂直井道",
              dof: "分段悬停 + 快速升降",
              mfg: "WDI、华强方特、S&S",
              text: "座舱在同一条井道里升降，停在不同高度时打开闸门展示布景，或被四面屏幕包围，随剧情多次上升、下落。",
              parks: [
                ["迪士尼", "加州《银河护卫队：使命突围》；东京与巴黎《惊魂古塔》"],
                ["方特", "《神州塔》《雷峰塔》"],
                ["华侨城", "柳州卡乐星球《圣地古塔》；常德卡乐星球《大闹天宫》；黄石卡乐星球《天地浩劫》（360° 环形巨幕井道升降塔）"],
                ["默林集团", "Alton Towers《复仇女神：地底惊魂 (Nemesis Sub-Terra)》（ABC Rides 地底异形巨卵孵化自由落体塔）；比隆乐高乐园《幽灵鬼屋 (Ghost)》"],
                ["云顶天城", "《地球改造塔挑战》"]
              ]
            }
          ]
        },
        {
          key: "c5",
          num: "V",
          title: "涉水与潜艇",
          en: "Water & submarine",
          desc: "以真实水体为载体。先按乘客在水面还是水下分为两支；水面船再按水下的牵引与主动控制能力细分。",
          children: [
            {
              code: "5.1",
              title: "水面浮航船",
              children: [
                {
                  code: "5.1.1",
                  title: "水泵推流、顺水漂流",
                  children: [
                    {
                      code: "5.1.1.1",
                      short: "叙事水道船",
                      title: "平缓或微跌落的室内叙事水道船",
                      en: "Narrative flume boat",
                      support: "混凝土水道 + 水泵推流",
                      dof: "顺水漂流，可含 1–2 段下坡",
                      mfg: "WDI、Mack Rides、Intamin、华强方特",
                      text: "平底船顺着水流前进，船底没有抓钩。吞吐量大，两岸可以密集地布置人偶与布景。",
                      parks: [
                        ["迪士尼", "《小小世界》《加勒比海盗》（经典版）《阿凡达：纳美河之旅》《辛巴达传奇之旅》《乐佩公主天灯盛会》"],
                        ["环球影城", "北京《功夫熊猫：神龙大侠之旅》"],
                        ["方特", "《缤纷华夏》/《七彩王国》、邯郸《成语童话》、《森林时光》、自贡《河谷探秘》"],
                        ["华侨城", "北京欢乐谷《欢乐世界》（近 400 个各国动态机械木偶水道船）；黄石卡乐星球《郑和下西洋》"],
                        ["默林集团", "意大利 Gardaland《海盗传奇 / 动物金银岛 (I Corsari)》（欧洲最大地下双层海盗水道船）；Chessington《咕噜牛河漂流历险记》；Alton Towers《花园宝宝魔幻游船》"],
                        ["六旗与雪松会", "Six Flags Over Georgia《怪兽庄园 (Monster Mansion)》（107 具全尺寸机械玩偶）；Six Flags Over Texas《洞穴海盗历险记 (Pirates of Speelunker Cave)》"],
                        ["欧洲四园", "Europa-Park《巴达维亚海盗》《精灵船》"],
                        ["欧洲名园", "法国 Parc Astérix《伊皮德迈斯高卢游船》"]
                      ]
                    },
                    {
                      code: "5.1.1.2",
                      short: "暗黑段 + 激流俯冲",
                      title: "室内暗黑段 + 高处俯冲的激流船",
                      en: "Dark flume / rapids",
                      support: "室内水道 + 提升段 + 俯冲滑道",
                      dof: "慢速漂流 + 高速俯冲溅水",
                      mfg: "Intamin、Mack、Hafema、ABC Rides、Arrow、华强方特",
                      text: "大半程在室内暗处经历人偶、坍塌、火焰等场景，最后被提升到高处俯冲落水。",
                      parks: [
                        ["迪士尼", "《蒂安娜的湾流冒险》/《飞溅山》"],
                        ["环球影城", "《侏罗纪公园》/《侏罗纪世界》激流船、冒险岛《达德利激流勇进》"],
                        ["方特", "《逃出恐龙岛》《神秘河谷》《飞跃河谷》《勇闯恐龙谷》《仙岛探秘》《津门大峡谷》《昆仑探秘》"],
                        ["华侨城", "北京欢乐谷《奥德赛之旅》；襄阳奇幻谷《方舟大冒险》；上海欢乐谷《峡谷漂流》；天津欢乐谷《室内激流勇进》"],
                        ["六旗与雪松会", "诺氏百乐坊《伐木山激流原木船 (Timber Mountain Log Ride)》（1969 全球首座全主题化原木激流船）与《卡利科河峡谷漂流》"],
                        ["默林集团", "乐高乐园《海盗瀑布》《奇马王国的远征》"],
                        ["迪拜与阿布扎比", "华纳兄弟世界《摩登原始人》"],
                        ["云顶天城", "《森林战士：月之谷奇幻漂流》"],
                        ["欧洲四园", "Phantasialand《河流探险》"],
                        ["欧洲名园", "法国 Parc Astérix《巨石快车》《海盗复仇记》"]
                      ]
                    },
                    {
                      code: "5.1.1.3",
                      short: "水下换轨 + 倒退",
                      title: "水道漂流 + 水下换轨倒退",
                      en: "Switch-track flume",
                      support: "水道 + 水下转盘或换轨机构",
                      dof: "正向漂流与倒退交替",
                      mfg: "Intamin、WDI、Mack Rides",
                      text: "船驶入水下的转盘或换轨机构，切换成倒退方向滑下一段，再转回正向。",
                      parks: [
                        ["迪士尼", "东京《安娜与艾莎的冰雪之旅》；EPCOT、香港、巴黎《魔雪奇幻之旅》"],
                        ["长隆", "珠海长隆海洋王国《超级激流》（海象山室内旋转提升 + 倒退跌落 + 正向冲浪）"],
                        ["欧洲四园", "Phantasialand《恰帕斯》"]
                      ]
                    }
                  ]
                },
                {
                  code: "5.1.2",
                  title: "水下钢缆或导轨牵引",
                  children: [
                    {
                      code: "5.1.2.1",
                      short: "水下牵引游船",
                      title: "水下钢缆或导轨牵引的平稳游船",
                      en: "Tow boat",
                      support: "水下闭合钢缆或导轨",
                      dof: "受控定速航行",
                      mfg: "Intamin 等",
                      text: "水面平静，船底连着水下的钢缆或导轨，船速与间距被精确控制，便于按时序触发岸边的大型机关与火焰。",
                      parks: [
                        ["环球影城", "日本《大白鲨》"],
                        ["欧洲四园", "Efteling《海市蜃楼》"],
                        ["六旗与雪松会", "雪松点《明轮船探险 / 蛇河远征队 (Snake River Expedition)》"]
                      ]
                    },
                    {
                      code: "5.1.2.2",
                      short: "导引大船 + 真水",
                      title: "导引大船 + 真水倾泻",
                      en: "Guided boat with practical flood",
                      support: "水下导轨",
                      dof: "沿水下导轨单向定速/变速航行（无全向自转底盘）",
                      mfg: "华强方特",
                      text: "载客较多的大船沿水下导轨穿过室内布景与巨幕，最后停在实景舞台前（或转入站立观演台），上百吨真水迎面倾泻。",
                      parks: [["方特", "《决战金山寺》《水漫金山》、南宁《马六甲勇士》"]]
                    },
                    {
                      code: "5.1.2.3",
                      short: "暗黑船 + 水上过山车",
                      title: "室内暗黑船 + 水上过山车",
                      en: "Dark boat + water coaster",
                      support: "水道 + 过山车提升与俯冲轨",
                      dof: "慢速暗黑段 → 过山车段",
                      mfg: "Kumbak、Mack Rides",
                      text: "船底同时有浮箱和过山车轮。前半段在室内水道慢行讲故事，后半段锁入轨道提升，再冲下水面。",
                      parks: [
                        ["长隆", "珠海长隆海洋王国《冰山过山车》（前半段穿过漫长室内冰洞与机械北极熊村庄，后半段攀上冰山顶俯冲落水）"],
                        ["欧洲四园", "Efteling《飞翔的荷兰人》；Europa-Park《波塞冬》"]
                      ]
                    }
                  ]
                },
                {
                  code: "5.1.3",
                  title: "水下主动控制的动感船",
                  children: [
                    {
                      code: "5.1.3.1",
                      short: "水下导轨全向旋转船",
                      title: "水下刚性导轨与全向旋转/直线电机驱动的动感船",
                      en: "Underwater-guided omnidirectional / rotational boat",
                      support: "水下刚性导轨 + 直线电机或伺服回转支承底盘",
                      dof: "360° 原地旋转、侧向迎敌横移、倒退、无级变速与摇摆",
                      mfg: "WDI、华强方特",
                      text: "船体浮在水面，船底通过水下立柱连接在水下隐藏钢轨的行走底盘上。底盘内置 360° 全向回转支承与驱动电机，使大船能像无轨车一样在巨幕和实景战舰之间原地调头、90° 侧转对轰、倒退与急速冲锋。上海迪士尼《加勒比海盗》与华强方特《致远 致远》均采用这一机制。",
                      demo: "lpX8YHcepW8",
                      demoNote: "第三方原理解析",
                      parks: [
                        ["迪士尼", "上海《加勒比海盗：沉落宝藏之战》（WDI 水下直线电机导引全向船）"],
                        ["方特", "《致远 致远》（宁波、淮安、赣州方特东方欲晓及太原方特 —— 水下导轨全向旋转变速战船，穿行阿姆斯特朗船厂实景并在黄海海战巨幕穹顶与战舰残骸间侧转对轰、旋转突围与全速冲锋）"]
                      ]
                    },
                    {
                      code: "5.1.3.2",
                      short: "铰接摇摆船",
                      title: "水下导引车 + 铰接摇摆船（Rocking Boat）",
                      en: "Rocking boat",
                      support: "水下导引车，船体与其铰接",
                      dof: "导引行驶 + 船体在水面与浪中摇摆 + 倒退",
                      mfg: "Mack Rides",
                      text: "船底下方是一辆水下导引车，船体与它铰接；水道没有侧墙，船在水面和人造浪里自由摇晃，也能倒退行驶。",
                      demo: "d6srd2tchaA",
                      demoNote: "Mack Rides 官方发布",
                      parks: [["欧洲四园", "Futuroscope《百慕大任务》（2025 年首套）"]]
                    }
                  ]
                }
              ]
            },
            {
              code: "5.2",
              short: "真水下潜艇",
              title: "真正潜入水下的潜艇",
              en: "Submarine",
              support: "水体中的导轨",
              dof: "液面以下潜航",
              mfg: "WDI、Mack Rides",
              text: "乘客坐在液面以下的密闭舱里，透过舷窗直接看水中的布景、真实鱼群或水下屏幕。",
              parks: [
                ["迪士尼", "加州《海底总动员潜艇之旅》"],
                ["长隆", "珠海长隆宇宙飞船《深海潜艇》（Mack Rides 真水下潜艇穿行真实鲨鱼池 + 水下防水 LED 巨幕）"],
                ["默林集团", "温莎、德国、加州、日本、迪拜乐高乐园《Submarine Adventure / Deep Sea Adventure》（Mack Rides 真水下潜艇）"]
              ]
            }
          ]
        }
      ]
    },
    {
      id: "theater",
      label: "剧场类",
      title: "暗黑剧场与动感平台",
      note: "乘客不随载具穿过多个房间，而是在原地或同一空间里，由平台、看台或整个房间的运动制造体验。",
      cats: [
        {
          key: "t1",
          num: "T1",
          title: "球幕飞行影院",
          en: "Flying theater",
          desc: "把乘客悬空送到巨型球幕前。体验相似，送入球幕的机械结构却有四种做法。",
          children: [
            {
              code: "T1.1",
              short: "平地入座、悬臂提升",
              title: "平地入座、悬臂整体提升",
              en: "Cantilever lift",
              support: "平地座椅 + 悬臂机构",
              dof: "整排提升 + 座椅轻微俯仰",
              mfg: "WDI",
              text: "乘客在平地上分三排坐好，悬臂把座椅整体举起、推入球幕，拼成上中下三层。不用爬楼，但结构庞大。",
              parks: [["迪士尼", "《翱翔·飞越地平线》（加州、EPCOT、上海、东京）"]]
            },
            {
              code: "T1.2",
              short: "多层楼板、向前推出",
              title: "多层楼板、座椅向前推出",
              en: "Multi-tier push-out",
              support: "多层楼板 + 前推机构",
              dof: "水平推出 + 座椅多自由度",
              mfg: "Brogent、华强方特、华侨城文旅科技等",
              text: "乘客分层就座，开始后前方护栏收起，座椅被向前推入球幕。模块化程度高，是目前最常见的做法；《阿凡达：翱翔》是摩托跨坐式的变体。",
              demo: "5IVhQ8cZKM0",
              demoNote: "Brogent i-Ride 介绍",
              parks: [
                ["迪士尼", "动物王国《阿凡达：翱翔》"],
                ["方特", "《伴你飞翔》《飞翔》、青岛《飞越恐龙岛》、资阳《山海》"],
                ["华侨城", "北京/上海/南京欢乐谷《奇境：穿越北纬30度》、武汉欢乐谷《飞越长江》、成都欢乐谷《飞越西部》、重庆欢乐谷《飞越重庆》、襄阳奇幻谷《飞越奇幻谷》《星际历险》"],
                ["默林集团", "温莎乐高乐园《Flight of the Sky Lion》（英国首座 i-Ride 飞行影院）"],
                ["欧洲名园", "西班牙冒险港 Ferrari Land《飞跃法拉利梦想 (Flying Dreams)》（Brogent i-Ride）"],
                ["迪拜与阿布扎比", "华纳兄弟世界《绿灯侠：银河奥德赛》、法拉利世界《飞越意大利》"],
                ["欧洲四园", "Europa-Park《飞越欧洲》"],
                ["其他", "富士急乐园《富士飞行社》"]
              ]
            },
            {
              code: "T1.3",
              short: "整座钢架提升",
              title: "多层钢架整体垂直提升",
              en: "Vertical cage lift",
              support: "多层钢架 + 卷扬与配重",
              dof: "整体垂直提升并前移",
              mfg: "华强方特",
              text: "上百名乘客坐进一座多层钢架，整座钢架被垂直提升十余米、推向球幕。过程很有工业感，但设备自重大。",
              parks: [["方特", "《飞越极限》（初代欢乐世界、梦幻王国）"]]
            },
            {
              code: "T1.4",
              short: "平地入座、整体翻转",
              title: "平地入座、平台整体翻转或 180° 旋转切入",
              en: "Tilting / revolving deck",
              support: "整块座椅平台 + 翻转或水平回转机构",
              dof: "平台翻转约 90° 或水平旋转 180° + 座椅摆动",
              mfg: "Dynamic Attractions、Brogent",
              text: "乘客在同一平面或三层大沙发快速入座，随后整块平台向上翻转 90° 或水平旋转 180°，直接把座椅送入球幕中心。上下客最快，翻转切入的瞬间本身也很有戏剧感。",
              demo: "Zs-fO9--u8w",
              demoNote: "Dynamic Attractions 飞行影院介绍",
              parks: [
                ["欧洲四园", "Futuroscope《非凡之旅》"],
                ["云顶天城", "《独立日：绝地反击》"],
                ["默林集团", "加州、佛州、比隆乐高乐园《乐高大电影：飞行大师 (Masters of Flight)》（Brogent m-Ride 180° 水平旋转推出）"]
              ]
            }
          ]
        },
        {
          key: "t2",
          num: "T2",
          title: "动感模拟器与原地设备",
          en: "Simulators & stationary rides",
          desc: "平台在原地运动，配合屏幕或球幕；也包括固定在原地的机械臂与室内暗黑 Flat Ride。",
          children: [
            {
              code: "T2.1",
              short: "密闭模拟舱",
              title: "密闭式六自由度模拟舱",
              en: "Enclosed simulator",
              support: "六自由度液压平台（或离心臂）",
              dof: "六自由度",
              mfg: "WDI、Simtec、Moog",
              text: "乘客坐在密闭舱内，舱内画面与舱体动作严格同步。《太空任务》甚至把舱体装在离心机臂末端，制造持续的超重感。",
              parks: [
                ["迪士尼", "《星际旅行：冒险继续》《千年隼：走私者逃亡》、EPCOT《太空任务》、香港《铁甲奇侠飞行之旅》"],
                ["欧洲四园", "Futuroscope 的 VR 赛车模拟器；Phantasialand 已退役的《Galaxy》"]
              ]
            },
            {
              code: "T2.2",
              short: "多层球幕模拟车",
              title: "球幕前分层排列的模拟车",
              en: "Multi-pod dome simulator",
              support: "多台举升式模拟车 + 巨型球幕",
              dof: "每台模拟车独立运动",
              mfg: "—",
              text: "巨型半球幕前分层排列多台模拟车，开场时被举起、送到画面前。",
              parks: [
                ["环球影城", "《辛普森一家》（奥兰多、好莱坞，前身《回到未来》）"],
                ["欧洲四园", "Futuroscope《亚瑟 4D 大冒险》"]
              ]
            },
            {
              code: "T2.3",
              short: "单甲板动感球幕",
              title: "单块甲板或多车舱的动感球幕平台",
              en: "Single-deck motion platform",
              support: "整块动感甲板 + 球幕",
              dof: "甲板整体多自由度",
              mfg: "Brogent、华强方特、华侨城文旅科技",
              text: "几十到三百名乘客坐在同一块大甲板（或并排大型飞船模拟舱）上，甲板整体运动，正对球幕。",
              parks: [
                ["长隆", "珠海长隆宇宙飞船《百慕大历险》（Brogent 单艘动感轮船甲板同时搭载 304 人，吉尼斯世界纪录）与《宇宙世界》"],
                ["华侨城", "襄阳奇幻谷《虫巢突围》（Triotech 站立式动感模拟舱 + 3D 射击）与《非常任务 / 深海探秘》"],
                ["方特", "《寻找鱼尾狮》/《动感无限》、徐州《龙宫奇遇》"],
                ["欧洲名园", "西班牙冒险港 Ferrari Land《赛车传奇 (Racing Legends)》（Brogent F1 球幕动感模拟器）"],
                ["迪拜与阿布扎比", "Motiongate《饥饿游戏：施惠国空中之旅》"]
              ]
            },
            {
              code: "T2.4",
              short: "成排动感座椅",
              title: "成排动感座椅 + 环幕或巨幕",
              en: "Motion-seat theater",
              support: "成排的动感座椅",
              dof: "座椅多自由度",
              mfg: "Simworx、Triotech、华强方特等",
              text: "观众席由多排动感座椅组成，面对环幕或巨幕。",
              parks: [
                ["环球影城", "《小黄人闹翻天》、梦工场剧场《功夫熊猫》、奥兰多《吉米·法伦纽约飞车》"],
                ["方特", "邯郸《疯狂成语》、《重返地球》《星际航班》"],
                ["华侨城", "深圳欢乐谷《飓风要塞》《XD 暴风追击》（Triotech）、天津欢乐谷《XD 动感影院》"],
                ["欧洲名园", "意大利 Movieland《安卓 3D：终局之战 (Android 3D)》；西班牙冒险港《深海奥德赛 / 恐龙逃生 4D》"],
                ["迪拜与阿布扎比", "Motiongate《功夫熊猫：势不可挡》"],
                ["欧洲四园", "Futuroscope《La Vienne Dynamique》"]
              ]
            },
            {
              code: "T2.5",
              short: "球形屏幕剧场",
              title: "完整球形屏幕中的悬挂座椅环",
              en: "Full-sphere dome ride",
              support: "完整球形屏幕 + 中心悬挂座椅环",
              dof: "旋转 + 倾斜 + 升降",
              mfg: "Intamin",
              text: "乘客从伸缩桥走进一个完整的球形屏幕，桥撤走后，脚下也是画面；座椅环在球心旋转、倾斜。",
              demo: "-hREiloLWdc",
              demoNote: "Intamin 官方介绍",
              parks: [["迪拜与阿布扎比", "阿布扎比海洋世界《超球体 360°》"]]
            },
            {
              code: "T2.6",
              short: "升降旋转穹顶",
              title: "升降旋转看台 + 穹顶球幕或 360° 环幕",
              en: "Elevating dome theater",
              support: "大型升降旋转平台 + 二楼穹顶或 360° 环幕",
              dof: "整座看台升降、旋转、全向倾斜",
              mfg: "华强方特、Dynamic Attractions、华侨城文旅科技",
              text: "观众先在一楼看实景预演，随后整座圆形看台或百人级飞船母舰升起、旋转倾斜，进入二楼穹顶球幕或 360° 环幕中心。",
              parks: [
                ["方特", "《牛郎织女》/《天河之恋》、《西游传说》/《大闹天宫》"],
                ["长隆", "广州长隆欢乐世界《星际决战》（Dynamic Attractions 180 座动感母舰平台 + 360° 环形穹幕）"],
                ["华侨城", "柳州/常德卡乐星球《神话》、黄石华侨城《女娲补天》（86 座全向倾斜顶升圆盘穹顶剧场）"]
              ]
            },
            {
              code: "T2.7",
              short: "原地机械臂与 Flat Ride",
              title: "原地固定的机械臂与室内暗黑 Flat Ride",
              en: "Stationary robots & indoor flat rides",
              support: "固定在地面的基座",
              dof: "原地多轴翻转",
              mfg: "KUKA、Huss、Intamin、Zamperla",
              text: "设备不沿路线移动，只在原地翻转、摆动，因此不算行进式暗黑乘骑，但常被包装在暗黑场景里。",
              parks: [
                ["欧洲四园", "Futuroscope《与机器人共舞》；Phantasialand《Talocan》《Mystery Castle》"],
                ["六旗与雪松会", "国王岛历史神作《古墓丽影：地穴巨兽 (Tomb Raider: The Ride)》（Huss 77 座巨型翻滚机械臂封装于古神庙火山冰洞内）"],
                ["长隆", "珠海长隆宇宙飞船室内暗黑机械游乐集群（《魔幻光轮》《海洋升降塔》等）"],
                ["默林集团", "乐高乐园《骑士锦标赛 (Power Builder)》（原地 KUKA 机械臂）"],
                ["迪拜与阿布扎比", "IMG《Thor Thunder Spin》"]
              ]
            }
          ]
        },
        {
          key: "t3",
          num: "T3",
          title: "运动的看台与舞台",
          en: "Moving auditoriums",
          desc: "运动的是观众席本身：倾斜旋转的舞台、沿轨道前进的看台，或绕中心旋转的观众席。",
          children: [
            {
              code: "T3.1",
              short: "倾斜旋转舞台",
              title: "可倾斜、升降的多级旋转舞台",
              en: "Dynamic motion stage",
              support: "中央大转盘 + 子转盘",
              dof: "旋转 + 倾斜 + 升降",
              mfg: "Intamin、Dynamic Attractions",
              text: "观众坐在直径十几米的大转盘上，转盘能旋转、倾斜、升降，上面还可以嵌套各自转动的小转盘。",
              demo: "i3u04ZhalaU",
              demoNote: "Intamin Dynamic Motion Stage",
              parks: [["欧洲四园", "Efteling《骷髅之舞》；Futuroscope《龙卷风猎人》"]]
            },
            {
              code: "T3.2",
              short: "有轨行走看台",
              title: "沿轨道前进的大型看台",
              en: "Traveling auditorium",
              support: "地面或顶部轨道上的整座看台",
              dof: "整座看台前进、后退、颠簸",
              mfg: "华强方特、WDI",
              text: "看似坐在剧场里，其实整座看台装着轨道轮，会开进多个实景场景。",
              parks: [
                ["方特", "一期欢乐世界《秦陵历险》、郑州《龙王传说》、株洲与绵阳 45 座《哪吒闹海》、天津《大闹水晶宫》"],
                ["迪士尼", "EPCOT 已退役的《宇宙能量馆》"]
              ]
            },
            {
              code: "T3.3",
              short: "旋转观众席",
              title: "绕中心旋转的观众席",
              en: "Revolving theater",
              support: "中央旋转平台",
              dof: "绕中心轴旋转",
              mfg: "华强方特、WDI",
              text: "观众席在中心旋转，四周是多个独立舞台或屏幕，每演完一幕就转向下一幕。",
              parks: [
                ["迪士尼", "神奇王国《进步旋转木马》"],
                ["方特", "《岁月如歌》、资阳《万世春秋》、《熊出没之重返侏罗纪》、南宁《马尼拉马尼拉》、安阳《周易》"],
                ["华侨城", "深圳欢乐谷《迷你大作战》（中央旋转转盘 + 徒手手势感应 3D 射击）"],
                ["迪拜与阿布扎比", "IMG《绿巨人：艾普西隆基地》"],
                ["其他", "法国狂人国的大型旋转观众席"]
              ]
            }
          ]
        },
        {
          key: "t4",
          num: "T4",
          title: "环幕隧道",
          en: "Immersive tunnel",
          desc: "大型游览车停进环幕隧道，靠车下平台与环绕画面制造“还在高速行驶”的错觉。",
          children: [
            {
              code: "T4.1",
              short: "游览车 + 环幕隧道",
              title: "游览车驶入 360° 环幕隧道或悬空转场车厢",
              en: "Tram in an immersive tunnel",
              support: "隧道式环幕 + 车下动感平台（或横向转场地铁车厢）",
              dof: "车辆原地颠簸或密室间秘密转场",
              mfg: "Simworx、Intamin、华侨城文旅科技",
              text: "几十人的游览车或地铁车厢驶入两侧与头顶都是屏幕的隧道（或多厅转场站台）后停在动感桥上，颠簸来自车下的平台，速度感来自环幕画面与真人特技。",
              parks: [
                ["环球影城", "好莱坞影棚之旅《金刚 360 3-D》《速度与激情：超动力》；奥兰多《金刚：骷髅岛》《速度与激情：超动力》"],
                ["默林集团", "英国 Thorpe Park《幽灵列车 (Ghost Train)》（Intamin/Simworx 悬空维多利亚车厢 + 内部伦敦地铁横向平移转场轨 + 真人特技与幻象）"],
                ["华侨城", "柳州/常德卡乐星球《疯狂巴士》、黄石华侨城《恐龙危机》（48~90 座观光大巴驶入 360° 柱面环幕隧道动感桥）"]
              ]
            }
          ]
        },
        {
          key: "t5",
          num: "T5",
          title: "疯屋",
          en: "Madhouse",
          desc: "座椅几乎不动，房间在转。眼睛与前庭的感受冲突，大脑选择相信眼睛。",
          children: [
            {
              code: "T5.1",
              short: "房间翻转的疯屋",
              title: "座椅微动、房间整体翻转",
              en: "Madhouse",
              support: "中央长椅 + 可整体翻转的房间",
              dof: "长椅小幅摆动；房间 360° 翻转",
              mfg: "Vekoma、Mack Rides",
              text: "乘客坐在房间中央的长椅上，长椅只轻微摆动，包裹在外的整间屋子连同家具一起翻转，让人以为自己倒了过来。",
              demo: "WZ9ygsK9yek",
              demoNote: "第三方原理讲解（英文）",
              parks: [
                ["欧洲四园", "Efteling《受诅咒的庄园》；Phantasialand《封神宫》；Europa-Park《卡珊德拉的诅咒》"],
                ["默林集团", "英国 Alton Towers《古塔魔咒 (Hex – The Legend of the Towers)》（真实 19 世纪古堡遗址预演厅 + Vekoma 疯屋）；意大利 Gardaland《魔法屋 (Magic House)》；温莎乐高乐园《怪兽派对鬼屋 (Haunted House Monster Party)》"],
                ["欧洲名园", "法国 Parc Astérix《凯撒的挑战 (Le Défi de César)》（Mack Rides 80 座疯屋 + 四段式幽默交互预演厅）"],
                ["六旗与雪松会", "Six Flags Great Adventure 与 New England《胡迪尼大逃亡 (Houdini's Great Escape)》（美国仅存的两座 Vekoma 疯屋）"],
                ["华侨城", "北京欢乐谷《特洛伊木马》"]
              ]
            }
          ]
        },
        {
          key: "t6",
          num: "T6",
          title: "特效与幻象剧场",
          en: "Effects & illusion theaters",
          desc: "以特效与舞台机械为主：幻象、程控动雕、机械布景、真水真火与 4D 影院。",
          children: [
            {
              code: "T6.1",
              short: "佩珀尔幻象",
              title: "佩珀尔幻象与真人同台",
              en: "Pepper's ghost theater",
              support: "倾斜半透膜 + 暗场投影",
              dof: "—",
              mfg: "华强方特等",
              text: "利用倾斜的半透膜把投影叠在真实舞台上，真人演员与幻象同台，可以瞬间消失、穿墙或化蝶。",
              parks: [
                ["方特", "《聊斋》《梁祝》/《千古蝶恋》、南宁《骠国乐》、《屈原》、邯郸《黄粱一梦》、自贡《青铜祭》等"],
                ["长隆与华侨城", "广州长隆《森林神庙 / 梦回兰若》；北京欢乐谷《魔幻剧场》"],
                ["默林集团", "Chessington《女巫扫帚排排坐 (Room on the Broom)》"],
                ["六旗与雪松会", "诺氏百乐坊历史传奇《神秘木屋 (Mystery Lodge)》；加州大美洲《质量效应：新地球》"]
              ]
            },
            {
              code: "T6.2",
              short: "程控空间矩阵",
              title: "程控卷扬机驱动的空间矩阵",
              en: "Kinetic matrix",
              support: "上千台程控卷扬机",
              dof: "—",
              mfg: "华强方特",
              text: "天花板上排列着上千台程控卷扬机，吊起的“砖块”或“球体”在空中拼出立体造型，配合投影与真人表演。",
              parks: [["方特", "《孟姜女》/《长城绝恋》、《飞翔之歌》、南宁《千岛之歌》、《楚乐》"]]
            },
            {
              code: "T6.3",
              short: "巨幕 + 机械布景",
              title: "巨幕与大型机械布景结合",
              en: "Screen with large animatronics",
              support: "影院 + 可动布景",
              dof: "—",
              mfg: "Kraftwerk、Garner Holt、华强方特等",
              text: "在影院里加入会动的大型实物布景，比如开合的巨树、飞过头顶的机械鸟，让屏幕内外连成一体。",
              parks: [
                ["长隆", "珠海长隆海洋王国《5D 城堡影院》（千人动感座椅 + 88 米巨幕 + 过顶滑索机械飞鸟）；长隆宇宙飞船《珊瑚秘境》《海洋狂想曲》"],
                ["方特", "《熊出没剧场》、东方欲晓《圆明园》、资阳《寻找李白》"],
                ["欧洲四园", "Efteling《印度睡莲》；Futuroscope《Eclipse》"]
              ]
            },
            {
              code: "T6.4",
              short: "LED 巨幕 + 无轨布景车",
              title: "LED 巨幕 + 无轨布景车 + 真人特技",
              en: "Automated stage with LED wall",
              support: "LED 巨幕 + 无轨布景平台",
              dof: "—",
              mfg: "—",
              text: "载着整段布景的无轨平台与巨幕画面同步移动，真人特技穿插其中。",
              parks: [["环球影城", "奥兰多《杰森·伯恩特技秀》"]]
            },
            {
              code: "T6.5",
              short: "真水真火灾难秀",
              title: "真水与爆破的灾难场景",
              en: "Practical disaster show",
              support: "大型水闸、燃气与机械布景",
              dof: "—",
              mfg: "Technifex、Thinkwell、Movieland、华侨城等",
              text: "上百吨真水、真火与坍塌布景在观众面前上演。",
              parks: [
                ["环球影城", "已退役的《地震》《浴火赤子情》《波塞冬之怒》；北京与新加坡《灯光，摄像，开拍！》"],
                ["欧洲名园", "西班牙冒险港 PortAventura《烈焰神庙 (Templo del Fuego)》（玛雅神庙真火吞噬 + 站立石台气动下沉 + 水墙扑火）；意大利 Movieland《U-571 潜艇极限灾难模拟器》（深水炸弹摇晃 + 数吨真水高压灌舱）与《岩浆号重型越野卡车劫难 (Magma 2.1)》《Disaster》"],
                ["华侨城与长隆", "东部华侨城《咆哮山谷》、深圳欢乐谷《山洪暴发》、北京欢乐谷《玛雅天灾》；长隆宇宙飞船《亚马逊风雨洪泛秀》"]
              ]
            },
            {
              code: "T6.6",
              short: "全黑与步入式惊悚馆",
              title: "全黑感官剥夺与步入式实景机关体验",
              en: "Sensory deprivation & walkthrough dark experience",
              support: "完全黑暗或镜面迷宫空间 + 声音、气味、触觉与真人演艺",
              dof: "—",
              mfg: "—",
              text: "关掉视觉或利用镜面、频闪与机械机关，靠声音、触感、温度、气味与贴脸演艺讲故事。",
              parks: [
                ["欧洲四园", "Futuroscope《Les Yeux Grands Fermés》"],
                ["迪士尼", "已退役的《ExtraTERRORestrial Alien Encounter》"],
                ["默林集团", "Thorpe Park《黑镜迷宫 (Black Mirror Labyrinth)》；Gardaland《勇敢者游戏：幻象迷宫》；全球《Dungeon 地牢》系列"],
                ["欧洲名园", "瑞典 Liseberg《加斯顿幽灵旅馆 (Spökhotellet Gasten)》；意大利 Movieland《福尔摩斯鬼店 (Holmes Hotel)》"]
              ]
            },
            {
              code: "T6.7",
              short: "4D 与环幕影院",
              title: "4D 特效影院与环幕、巨幕影院",
              en: "4D & giant screen",
              support: "影院 + 座椅特效",
              dof: "座椅震动、喷水、喷气等",
              mfg: "SimEx-Iwerks、Kraftwerk、CL Corporation、Triotech",
              text: "标准的 3D/4D 特效影院，以及环幕和超大银幕影院。",
              parks: [
                ["迪士尼与环球", "迪士尼《米奇幻想曲》；环球《史瑞克 4D》"],
                ["方特与长隆与华侨城", "方特《海螺湾》《九州神韵》；广州长隆与各欢乐谷《四维影院》"],
                ["默林与六旗与欧洲名园", "全球乐高乐园《乐高 4D 影院》、Gardaland《Time Voyagers》、Parc Astérix《小心巨石！(Attention Menhir!)》、卡罗温兹《植物大战僵尸 3Z 竞技场》"]
              ]
            }
          ]
        }
      ]
    }
  ]
};

/* Visual & interaction techniques (glossary). */
window.TECHNIQUES = {
  visual: [
    { name: "纯实景与高精度机械人偶", desc: "不依赖屏幕，靠建筑尺度的实景与动作细腻的电动人偶讲故事。", ex: "迪士尼《阿凡达：纳美河之旅》《美女与野兽“魔法奇缘”》；环球《怪物大暴走》；Efteling《幻想宫殿》" },
    { name: "按车辆位置校正的 3D 画面", desc: "根据车辆的实时位置调整 3D 画面的透视，让屏幕与旁边的实景接得上。", ex: "环球《蜘蛛侠》《变形金刚》；云顶《猩球崛起》；方特《女娲补天》" },
    { name: "倾斜球幕与车身前倾", desc: "无轨动感车停在倾斜球幕边缘，下方视野被画面填满，车身随画面前倾、侧倾。", ex: "方特《神画》《千古风华》《石窟奇遇》" },
    { name: "随车移动的球幕", desc: "几块半球幕装在旋转结构上，与机械臂车辆同步移动，始终包住乘客的视野。", ex: "环球《哈利·波特与禁忌之旅》" },
    { name: "实景投影映射", desc: "不戴眼镜，用多台投影机把立体布景本身变成可以变化的画面。", ex: "迪士尼《米奇与米妮的逃亡铁路》" },
    { name: "佩珀尔幻象", desc: "倾斜的玻璃或半透膜把暗处的影像反射进真实空间。", ex: "迪士尼《幽灵公馆》《迷离大宅》；方特《聊斋》《梁祝》" },
    { name: "真实水体与水下屏幕", desc: "真实的鱼群与水体在前，水下屏幕在后，虚实叠在一起。", ex: "珠海长隆《深海潜艇》；乐高乐园潜艇" }
  ],
  interaction: [
    { name: "激光打靶", desc: "射击实景上的感光靶点，命中后触发机关并计分。", ex: "迪士尼《巴斯光年》；Europa-Park《亚特兰蒂斯历险》；方特《宇宙小勇士》" },
    { name: "3D 屏幕弹道射击", desc: "向 3D 屏幕投掷能看见弹道的虚拟“炮弹”。", ex: "迪士尼《玩具总动员疯狂游戏屋》；Phantasialand《巧克力大冒险》；云顶《博物馆奇妙夜》；方特《熊出没历险记》" },
    { name: "手电筒探索", desc: "用手电筒照亮藏起来的角色与机关，不计分。", ex: "东京迪士尼乐园《怪兽电力公司“迷藏巡游车”》" },
    { name: "车对车对抗", desc: "两车并排前进，射中对方的目标会让对方车辆失控打转。", ex: "奥兰多环球《黑衣人：外星人攻击》" },
    { name: "手势识别与人脸映射", desc: "摄像头识别手势来“射网”，或把乘客的脸做成角色。", ex: "迪士尼《蜘蛛侠大冒险》；乐高乐园《幻影忍者》；环球《爱宠大机密》" },
    { name: "AR 护目镜", desc: "在真实布景上叠加虚拟角色与道具，看向哪里就能打向哪里。", ex: "环球《马力欧卡丁车：库巴的挑战》" },
    { name: "手机联动与成长", desc: "射击器与手机 App 绑定，跨次游玩累积分数与装备。", ex: "奥兰多环球《小黄人恶人大会》" },
    { name: "分工驾驶与自选路线", desc: "多人分担驾驶与射击，或在排队时自选路线。", ex: "迪士尼《千年隼：走私者逃亡》；Efteling《幻想宫殿》；奥兰多海洋世界《南极洲：企鹅帝国》" }
  ]
};

/* "Did you know" notes for the home page. Each points at a mechanism and a verified video. */
window.FACTS = [
  {
    text: "《哈利·波特与禁忌之旅》的机械臂并不挂在天花板上——它们装在地面轨道车上，轨道被黑色地台挡住了。",
    code: "1.1.3.1",
    video: "OGY6P6UkH4Q",
    caption: "开灯实拍"
  },
  {
    text: "方特《千古风华》里“飞进千里江山图”的感觉，来自无轨车上的动感平台，加上一块向下延伸、遮住地面的倾斜球幕。",
    code: "2.2.2",
    video: "PptiYHy7W1c",
    caption: "荆州方特"
  },
  {
    text: "上海《加勒比海盗》的船看似漂在水上，其实由水下导轨与直线电机驱动，所以能原地转向、横移和倒退。",
    code: "5.1.3.1",
    video: "lpX8YHcepW8",
    caption: "原理解析"
  },
  {
    text: "疯屋里真正翻转的不是座椅，而是整个房间。座椅只轻轻摆动，大脑却以为自己倒了过来。",
    code: "T5.1",
    video: "BP88eRuN6KI",
    caption: "Efteling《受诅咒的庄园》"
  },
  {
    text: "迪士尼《印第安纳琼斯》不旋转、不用 3D 眼镜，所有刺激都来自越野车的液压悬挂和实景——方特《秦俑地宫》走的是同一条路线。",
    code: "1.1.2.3",
    video: "kGaMdu4s7fk",
    caption: "开灯拆解"
  },
  {
    text: "奥兰多的惊魂古塔里，电梯厢会离开井道，水平开过一段走廊，再进入另一条井道下落。",
    code: "4.1",
    video: "6nXRJsNuuoY",
    caption: "好莱坞影城"
  }
];
