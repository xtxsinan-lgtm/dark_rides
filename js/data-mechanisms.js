// Complete Part 1 (5 Physical Dark Ride Categories) + Part 2 (6 Dark Theater Categories) + Part 4 (Visual & Interaction Matrix)
window.MECHANISM_TREE_DATA = {
  part1: [
    {
      id: "c1",
      title: "门类一：地面水平有轨系统 (Floor-Tracked Systems)",
      subtitle: "4级可变深度嵌套 · 含 1.1 有座舱导轨车 (0~6 DOF / 机械臂 / 跨界) 与 1.2 无座舱连续传送带",
      groups: [
        {
          groupTitle: "1.1.1 固定或单轴水平旋转座舱 (0~1 DOF：无车载俯仰横滚)",
          nodes: [
            {
              code: "1.1.1.1",
              name: "间歇发车传统地面有轨小车（含手动/受控自转）",
              support: "地面导电槽轨 / 工字钢轨 (Busbar Track)",
              dof: "0~1 DOF（沿轨平移 + 车载电机或方向盘 Yaw 自转）",
              mfg: "WDI / ETF Ride Systems / Mack Rides / 华强方特",
              principle: "分批或单车发车，通过地面导电轨取电；座舱朝向固定或仅能绕垂直轴水平旋转（如兔子罗杰方向盘自转、疯狂兔子马桶旋转震动）。",
              demoYtId: "",
              parks: [
                { label: "迪士尼", items: "《白雪公主》《匹诺曹》《蟾蜍先生》《爱丽丝梦游仙境》《小熊维尼》《兔子罗杰卡通转转车》《怪兽电力公司：大营救》" },
                { label: "环球影城", items: "奥兰多冒险岛《苏斯博士帽子里的猫 (The Cat in the Hat)》" },
                { label: "中国方特", items: "安阳方特《怪奇公馆》、熊出没乐园《玩具屋大冒险》" },
                { label: "迪拜与阿布扎比", items: "Motiongate《蓝精灵工作室之旅》《怪物史瑞克童话之旅》、IMG《失落谷：恐龙禁区 (70只机械恐龙)》" },
                { label: "欧洲四大标杆", items: "法国 Futuroscope《疯狂兔子时光机 (La Machine à voyager dans le temps)》、Europa-Park《白雪公主雪橇》《Piccolo Mondo》" }
              ]
            },
            {
              code: "1.1.1.2",
              name: "连续匀速移动全向车链 (Omnimover / Endless Transit)",
              support: "地面闭合连续移动车链导轨",
              dof: "1 DOF（0.6 m/s 永不停车平移 + 轨道凸轮/伺服强制 Yaw 转角）",
              mfg: "WDI / Arrow / Mack Rides / Schwarzkopf / Oceaneering",
              principle: "上百节车厢首尾相连永不停车（吞吐量高达 2400~3200 人/小时），高靠背桶形车壳配合强制水平转头，像电影摄影机一样精确框定游客视野并遮挡邻车。",
              demoYtId: "i1GV8qXavSg",
              parks: [
                { label: "迪士尼", items: "《幽灵公馆 (Haunted Mansion)》《幻影庄园》《小美人鱼》《Spaceship Earth》《海底总动员：尼莫与朋友们 (贴真水族馆玻璃)》" },
                { label: "环球影城", items: "好莱坞《爱宠大机密 (面部捕捉映射虚拟小狗)》、日本/Epic Universe《耀西的冒险》" },
                { label: "欧洲四大标杆", items: "德国 Phantasialand《幽灵人力车 (Geister Rikscha — 欧洲最长全地下中式神话 Omnimover)》、荷兰 Efteling《狂欢节 (Carnaval Festival)》、德国 Europa-Park《美第奇城堡》《老奶奶恐龙馆 (Madame Freudenreich)》" }
              ]
            },
            {
              code: "1.1.1.3",
              name: "有轨旋转底盘 + 射击交互系统 (Interactive Blaster / AR Ride)",
              support: "地面单轨或双轨并排竞速导轨",
              dof: "1 DOF（有轨平移 + 摇杆手动 360° 或程序高速甩转 Whip-around）",
              mfg: "ETF / MTS / Mack / Triotech / Alterface / 华强方特",
              principle: "有轨旋转底盘搭载红外激光枪、拉绳弹簧 3D 彩球炮、手电筒、徒手深度摄像头或 AR 头显，支持实景打靶、3D 屏幕射击或双车 PVP 互射对方排气管令对方失控自转。",
              demoYtId: "gWK2apK--no",
              parks: [
                { label: "迪士尼", items: "《巴斯光年星际营救》《蚁人与黄蜂女》《玩具总动员疯狂游戏屋》《怪兽电力公司迷藏巡游车(手电筒)》《蜘蛛侠 WEB SLINGERS(徒手射网)》" },
                { label: "环球影城", items: "《马力欧卡丁车：库巴的挑战(双轨+AR头显)》、奥兰多《黑衣人：外星人攻击(双轨PVP互射狂转)》" },
                { label: "中国方特 (38园)", items: "《熊出没历险记》(20+园)、《神枪手》(东方欲晓)、《百发百中》(台州/邯郸)、《宇宙小勇士》、《丛林卫士》(自贡)、《小鸡不好惹之大反击》(青岛)" },
                { label: "迪拜 & 云顶 SkyWorlds", items: "吉隆坡云顶《博物馆奇妙夜：午夜大混乱》、阿布扎比华纳《乐一通 Ani-Mayhem》、法拉利世界《Benno's Great Race》、迪拜乐高《幻影忍者》" },
                { label: "欧洲四大标杆", items: "德国 Phantasialand《Maus au Chocolat (奶油打老鼠)》、德国 Europa-Park《亚特兰蒂斯历险》" }
              ]
            },
            {
              code: "1.1.1.4",
              name: "普通有轨车 + 局部轨道段液压动感跳台桥 (Track Motion Bridge)",
              support: "地面导轨 + 房间地板下 6-DOF 液压动感桥",
              dof: "车体 1-DOF 旋转 + 局部铁轨桥面 6-DOF 颠簸",
              mfg: "Mack Rides",
              principle: "小车本身不装昂贵的 6-DOF 液压缸，但中途某几个穹顶房间的铁轨架设在地面液压平台上；车开上桥面锁止后，桥面带着铁轨和小车一起上下弹跳。",
              demoYtId: "",
              parks: [
                { label: "欧洲四大标杆", items: "德国 Europa-Park《斯诺里章鱼之旅 (Snorri Touren — 含两座弧幕液压动感跳台桥)》" }
              ]
            }
          ]
        },
        {
          groupTitle: "1.1.2 车载多自由度动感平台系统 (3~6 DOF：每辆车自带俯仰/横滚/升降伺服机构)",
          nodes: [
            {
              code: "1.1.2.1",
              name: "车载 6-DOF 动感平台 + 360° 自转 + 3D/巨幕系统 (SCOOP / MR Ride)",
              support: "地面隐藏供电槽轨 + 车载 6-DOF 斯图尔特平台",
              dof: "6-DOF (Pitch/Roll/Heave/Surge/Sway) + Yaw 360° 连续回转",
              mfg: "Oceaneering International / 华强方特 / Dynamic",
              principle: "每辆 8~16 座车底盘背负一套 6 自由度平台与 360° 回转盘，配合 Squinching 动态视点透视矫正 3D 巨幕与实景火水特效，靠原地高速自转+仰角+风流制造高空坠楼与飞驰体感。",
              demoYtId: "CySHvb_4fHk",
              parks: [
                { label: "环球影城", items: "奥兰多《蜘蛛侠》(鼻祖)、全球《变形金刚：火种源之战》(好莱坞/奥兰多含双层垂直电梯)、北京环球独占《侏罗纪世界大冒险》(免3D眼镜纯实景+巨幕版)" },
                { label: "迪士尼", items: "东京迪士尼海洋 2024《小飞侠梦幻岛历险记 (Peter Pan's Never Land Adventure)》" },
                { label: "中国方特 (38园)", items: "《女娲补天》《恐龙危机》《魔法城堡》《哪吒闹海(东方神画8~16座车版)》《大闹水晶宫(芜湖东方神画)》《突围》《铁道游击》《封神》(安阳)《拉玛传奇》(南宁)《丝路奇遇》《地心历险》(自贡双层)《古蜀历险》(资阳)《勇者之城》(台州)" },
                { label: "迪拜 & 云顶 SkyWorlds", items: "吉隆坡云顶《猩球崛起：入侵 (Invasion of the Planet of the Apes)》、阿布扎比华纳《正义联盟》、迪拜 IMG《复仇者联盟：奥创之战》" }
              ]
            },
            {
              code: "1.1.2.2",
              name: "车载大行程垂直升降剪刀叉 + 6-DOF 多向飞天电梯车",
              support: "地面重型导轨 + 车载数米垂直剪刀叉升降立柱",
              dof: "地面平移 + 数米垂直真实举升急降 + 6-DOF 座舱俯仰翻滚",
              mfg: "Simtec Systems",
              principle: "在地面导轨底盘与 6-DOF 座舱之间增设一套数米行程的重型剪刀叉垂直升降机构，使 14 座车厢在沿轨横移时能真实升起数米高再急速失重下坠。",
              demoYtId: "AfFMtDC4-AE",
              parks: [
                { label: "环球影城", items: "2025 奥兰多 Epic Universe《哈利·波特与魔法部之战 (Harry Potter and the Battle at the Ministry)》" }
              ]
            },
            {
              code: "1.1.2.3",
              name: "车载多自由度越野探险吉普系统 (Disney EMV 纯实景古墓路线)",
              support: "地面槽轨 + 车载 3000psi 高压液压/伺服悬架",
              dof: "轨道变速 + 大行程 Pitch 俯仰 / Roll 横滚 / Heave 颠簸（无 360° 陀螺自转）",
              mfg: "WDI / MTS Systems / 华强方特",
              principle: "采用 12 座（3排×4人）敞篷考古越野吉普车，不戴 3D 眼镜、不做 360° 自转，靠车头探照灯照亮幽暗实景古墓/丛林，模拟断桥下陷、巨石滚落倒车与崎岖路面猛烈颠簸。",
              demoYtId: "7RJLNQRBRYI",
              parks: [
                { label: "迪士尼", items: "加州迪士尼 & 东京迪士尼海洋《印第安纳琼斯冒险旅程 (Indiana Jones Adventure)》、奥兰多动物王国《恐龙 (DINOSAUR)》" },
                { label: "中国方特", items: "青岛方特梦幻王国《秦俑地宫》、芜湖/厦门/株洲方特梦幻王国二期版《秦陵历险》（12座 3×4 考古探险吉普穿过实体兵马俑军阵与机关，对标印第安纳琼斯；区别于一期欢乐世界 T3.2 大看台车版）" }
              ]
            }
          ]
        },
        {
          groupTitle: "1.1.3 车载多轴工业机械臂系统 (Tracked 6-Axis Robotic Arm)",
          nodes: [
            {
              code: "1.1.3.1",
              name: "地面连续导电轨 + 6 轴串联工业机械臂 (KUKA RoboCoaster G2)",
              support: "地面连续导电导轨 + 重型地面配重底盘（非顶部悬挂！）",
              dof: "底盘匀速平移 + J1~J6 六轴串联机械臂三维 X/Y/Z 伸缩与 ±110° 仰躺翻转",
              mfg: "KUKA Robotics + Dynamic Attractions",
              principle: "地面配重底盘沿地面导轨连续滑行，上方 6 轴 KUKA 工业机械臂从椅背上方抓持 4 人悬空长椅，实现数米高低伸缩与近乎平躺的翻转，配合随车同步旋转的半球幕转盘（Carousel of Domes）或巨型怪兽人偶。",
              demoYtId: "2_SEJHxlmWw",
              parks: [
                { label: "环球影城 (全球独占)", items: "奥兰多/好莱坞/日本/北京《哈利·波特与禁忌之旅 (Forbidden Journey)》、2025 奥兰多 Epic Universe《科学怪人：怪物大暴走 (Monsters Unchained — 第二代高角速度 KUKA 机械臂)》" }
              ]
            },
            {
              code: "1.1.3.2",
              name: "高速导轨底盘 + 多自由度机器人悬臂 (Robotic Motion Vehicle)",
              support: "过山车级地面高速钢轨 + 车载多自由度机器人悬臂",
              dof: "底盘高速冲刺甩尾 + 机械悬臂大角度抬升俯仰旋转",
              mfg: "Dynamic Attractions",
              principle: "将过山车级高速加减速底盘与高刚性多轴机器人旋转俯仰悬臂结合，突破了传统 KUKA 机械臂底盘只能匀速慢行的局限。",
              demoYtId: "aZPwWSRKcdg",
              parks: [
                { label: "迪拜与阿布扎比", items: "阿布扎比华纳兄弟世界《蝙蝠侠：暗夜飞行 (Batman: Knight Flight — 全球唯一投运)》" }
              ]
            }
          ]
        },
        {
          groupTitle: "1.1.4 地面慢速 Dark Ride 叙事 + 高速槽轨/过山车跨界系统",
          nodes: [
            {
              code: "1.1.4.1",
              name: "室内慢速机械人偶叙事 + 室外百公里高速槽轨测试车 (Slot Car)",
              support: "地面深槽导向轨 + 三相高压供电母线",
              dof: "室内 5 km/h 慢速叙事 → 室外 105 km/h 高速倾角飙车",
              mfg: "WDI / Dynamic Structures",
              principle: "放大版四驱导轨车，每辆 6 座敞篷车内置 250 马力电机，前半程在室内慢速观赏完整机械人偶剧情，后半程瞬间爆发百公里加速双车并排竞速。",
              demoYtId: "NkJRM55tujM",
              parks: [
                { label: "迪士尼 (全球独占)", items: "加州冒险乐园《汽车总动员：水箱温泉镇赛车手》、东京迪士尼海洋《地心探险之旅》、奥兰多 EPCOT《测试赛道 (Test Track)》" }
              ]
            },
            {
              code: "1.1.4.2",
              name: "车载旋转/俯仰底盘 + 倾斜跌落/侧滑轨巨幕叙事过山车 (SFX / Omnicoaster)",
              support: "钢管轨道 + 车载 360° 伺服旋转/液压俯仰底盘 + 特种变轨机关",
              dof: "车载 360° 强制运镜 + 跷跷板倾斜释放轨 (Tilt Track) + 侧向滑轨 (Sideways Slide)",
              mfg: "Intamin / Vekoma / Dynamic Attractions",
              principle: "在钢管轨道上搭载车载旋转俯仰底盘，配合跷跷板倾斜轨、螃蟹步侧向滑轨与多块 3D 巨幕，大半程用于演绎完整剧情。",
              demoYtId: "GkwmE1DrZ5E",
              parks: [
                { label: "环球影城", items: "奥兰多《哈利·波特与逃出古灵阁 (Escape from Gringotts)》" },
                { label: "迪士尼", items: "奥兰多 EPCOT《银河护卫队：宇宙倒带 (Guardians of the Galaxy: Cosmic Rewind)》" },
                { label: "迪拜与阿布扎比", items: "阿布扎比法拉利世界《法拉利使命 (Mission Ferrari — 全球唯一 Dynamic SFX Coaster)》" }
              ]
            },
            {
              code: "1.1.4.3",
              name: "半程慢速古墓/地狱实景 Dark Ride + 半程弹射过山车",
              support: "室内有轨慢速巡游段 + 变轨倒退/LIM 弹射钢轨",
              dof: "前半程慢速观赏实景机械人偶 → 后半程高速过山车",
              mfg: "Premier Rides / Vekoma / 华强方特",
              principle: "仅收录真正具备独立慢速多房间 Dark Ride 叙事巡游段的跨界作品（纯室内高速过山车已剔除）。",
              demoYtId: "N8FSuOjoy8w",
              parks: [
                { label: "环球影城", items: "奥兰多/好莱坞/新加坡《木乃伊复仇 (Revenge of the Mummy)》" },
                { label: "迪士尼", items: "奥兰多/上海《七个小矮人矿山车（矿洞内七矮人慢速音乐暗黑段）》" },
                { label: "中国方特", items: "芜湖/宁波/济南方特东方神画《惊魂之旅》/《灵魂之旅》（十八层地狱实景叙事过山车）" },
                { label: "全球乐高乐园", items: "《飞龙过山车 (The Dragon — 前半程室内乐高城堡机械火龙慢速 Dark Ride)》" }
              ]
            }
          ]
        },
        {
          groupTitle: "1.2 无座舱地面连续移动履带系统 (Moving Walkway)",
          nodes: [
            {
              code: "1.2",
              name: "无座舱地面连续移动传送带步道射击系统",
              support: "地面蜿蜒闭合连续移动传送带步道",
              dof: "站立匀速平移 (0.5 m/s)，无座舱束缚",
              mfg: "Mack Rides / Universal Creative",
              principle: "拆除了 Omnimover 的车厢与座椅，游客全程站立在蜿蜒穿过多个实景与巨幕大厅的移动步道上，手持 NFC 手机互联脉冲枪射击升级。",
              demoYtId: "",
              parks: [
                { label: "环球影城", items: "奥兰多环球影城《小黄人恶人大会 (Villain-Con Minion Blast)》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c2",
      title: "门类二：地面无轨自由导引系统 (Trackless AGV / LPS)",
      subtitle: "2~3级可变深度嵌套 · 车载电池供电 + RFID/激光雷达/光学寻迹",
      groups: [
        {
          groupTitle: "2.1 ~ 2.3 按车载上装自由度与跨界能力递进",
          nodes: [
            {
              code: "2.1",
              name: "平层无轨阵列与多路径分道系统 (2D Planar Trackless AGV)",
              support: "平地自由走行（地板 RFID 矩阵 / 埋地磁钉 / 光学信标 / 激光雷达）",
              dof: "平面 X/Y 全向走位 + Yaw 360° 原地自转（无车载俯仰液压缸）",
              mfg: "WDI / Oceaneering / ETF Ride Systems (Multi Mover)",
              principle: "多车在大厅内交叉编队群舞、真随机分道或由游客在排队区自主选择 3 条不同路线分支，彻底打破有轨车单线顺序叙事的束缚。",
              demoYtId: "dzSVhAota8w",
              parks: [
                { label: "迪士尼", items: "香港《迷离大宅 (Mystic Manor)》、东京《小熊维尼猎蜜记 (鼻祖)》《水逗船》、巴黎/奥兰多《料理鼠王》、奥兰多/加州《米奇与米妮的逃亡铁路 (无轨解钩分道)》" },
                { label: "中国方特", items: "南宁方特《相约下龙湾》、安阳方特《殷商往事》" },
                { label: "迪拜 & 云顶 SkyWorlds", items: "吉隆坡云顶《冰川时代：薄冰远征》、迪拜 Motiongate《捉鬼敢死队》《精灵旅社》、阿布扎比华纳《史酷比神秘博物馆》" },
                { label: "欧洲四大标杆", items: "荷兰 Efteling《幻想宫殿 (Symbolica — 排队自主选 3 条路线分支)》" }
              ]
            },
            {
              code: "2.2.1",
              name: "无轨底盘 + 车载多自由度动感平台（纯实景/局部巨幕耦合）",
              support: "无轨 AGV 全向底盘 + 车载 3~6 DOF 液压/电动摇摆平台",
              dof: "平面 X/Y 全向走位 + Yaw 360° + Pitch 俯仰 / Roll 横滚 / Heave 起伏",
              mfg: "WDI / Panasonic / Oceaneering",
              principle: "在无轨底盘上方叠加多自由度俯仰横滚机构，既能无轨编队走位，又能随华尔兹音乐起伏跳舞或模拟冰面横向打滑甩尾。",
              demoYtId: "5rMc3FOsqBs",
              parks: [
                { label: "迪士尼", items: "东京迪士尼《美女与野兽“魔法奇缘”》、上海迪士尼《疯狂动物城：热力追踪》" },
                { label: "全球其他代表", items: "奥兰多海洋世界《南极洲：企鹅帝国 (可选温和/颠簸两档)》" }
              ]
            },
            {
              code: "2.2.2",
              name: "无轨底盘 + 车载多自由度平台 + 内凹倾斜球幕/360°环幕飞行系统",
              support: "无轨 AGV 底盘 + 车载多自由度俯仰横滚平台 + 内凹倾斜球幕悬崖停靠台",
              dof: "无轨全向走位 + 球幕悬崖边缘大角度前倾俯冲(Pitch)与侧倾盘旋(Roll)",
              mfg: "华强方特智能技术",
              principle: "前几幕在平地无轨穿行画卷长廊，高潮段驶入内凹倾斜球幕深坑边缘剥夺下视野，配合车体大角度俯仰侧倾与 3D 航拍光流（Vection），在地面无轨车上完美复现球幕飞行影院凌空飞越《千里江山图》的体感！",
              demoYtId: "PptiYHy7W1c",
              parks: [
                { label: "中国方特 (独创旗舰)", items: "太原/绵阳/鹰潭《神画》、宁波/荆州/邯郸《千古风华》、资阳《石窟奇遇》、荆州《火烧赤壁》(无轨+360°环幕+旋转台)、芜湖/厦门/济南/嘉峪关《魅力戏曲》/《梨园游记》" }
              ]
            },
            {
              code: "2.3",
              name: "无轨底盘 + 垂直自由落体电梯跨界复合系统",
              support: "多层楼面无轨 AGV + Intamin 垂直自由落体升降机轿厢",
              dof: "平面无轨双车分道 + 整车驶入垂直跳楼机失重坠落",
              mfg: "WDI / Roush / Intamin",
              principle: "无轨车不仅在平地自由穿行，还能直接开进逃生舱垂直自由落体升降机内，连车带人一起从高空失重坠落到下一层楼面继续无轨行驶。",
              demoYtId: "YxCErBfzcNY",
              parks: [
                { label: "迪士尼", items: "奥兰多好莱坞影城 & 加州迪士尼《星球大战：抵抗组织崛起 (Star Wars: Rise of the Resistance)》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c3",
      title: "门类三：空中顶部悬挂轨道系统 (Overhead Suspended)",
      subtitle: "2级嵌套 · 轨道架设于天花板上方，车厢垂挂于轨道下方",
      groups: [
        {
          groupTitle: "3.1 ~ 3.4 按悬挂座舱调速与主动自由度递进",
          nodes: [
            {
              code: "3.1",
              name: "传统恒速/数控变速单轨悬挂系统（含干式伪水下潜艇）",
              support: "天花板单根工字钢或方管导轨",
              dof: "空中悬挂平移（转弯靠离心力微摆）",
              mfg: "WDI / Mack Rides / Zamperla",
              principle: "座舱垂挂于头顶单轨下方飞越脚下微缩布景；东京《海底两万里》更利用双层舷窗玻璃夹水打气泡，在完全干燥的悬挂轨道上伪装出潜入深海的错觉。",
              demoYtId: "",
              parks: [
                { label: "迪士尼", items: "全球 5 园《小飞侠天空奇遇 (Peter Pan's Flight)》、东京迪士尼海洋《海底两万里 (干式伪水下悬挂潜艇)》" },
                { label: "环球 & 云顶 SkyWorlds", items: "奥兰多《E.T. 外星人历险记》、新加坡《芝麻街太空追逐》、云顶《机器人历险记：大焊先生飞艇》" }
              ]
            },
            {
              code: "3.2",
              name: "变速重力螺旋俯冲摆动悬挂系统 (Spiral Swinging Cabin)",
              support: "顶部变速悬挂轨 + 螺旋高塔重力俯冲段",
              dof: "慢速巡游 + 高速螺旋盘旋俯冲（座舱离心外甩 45°）",
              mfg: "Translift / Vekoma / Kumbak",
              principle: "吊舱在慢速观赏仙女森林后解锁离合器，沿 13 米高暗黑沼泽巨树螺旋轨道高速俯冲盘旋而下。",
              demoYtId: "sBY_ZLb6bJM",
              parks: [
                { label: "欧洲四大标杆", items: "荷兰 Efteling《梦境飞行 (Droomvlucht)》" }
              ]
            },
            {
              code: "3.3",
              name: "顶部悬挂多自由度抓举式动感座舱系统 (Suspended Multi-DOF Cabin)",
              support: "天花板重型工字钢轨道 + 顶部万向回转支承与液压俯仰连杆",
              dof: "空中平移 + Yaw 360° 旋转 + ±45°~240° 抓举式仰俯翻滚（无 KUKA 大小臂）",
              mfg: "华强方特智能技术 / SetPoint",
              principle: "轨道在天花板上方，走行小车通过回转盘与液压俯仰缸向下吊挂座舱，重心始终在轨道正下方，模拟被铁扇公主芭蕉扇吹飞在空中翻滚。",
              demoYtId: "",
              parks: [
                { label: "中国方特", items: "全国十余座方特《烈焰风云》/《火焰山》/《穿越火焰山》" }
              ]
            },
            {
              code: "3.4",
              name: "悬挂式车载电机慢速旋转看戏 + 高速飞行跨界系统 (Inverted Powered / Flyer)",
              support: "天花板双管过山车钢轨 + 车载牵引电机 + 伺服旋转吊柱",
              dof: "0.5 m/s 室内慢速悬停转头看戏 → 40 km/h 高速冲刺（或 90° 趴姿翻转飞行）",
              mfg: "Mack Rides / Vekoma",
              principle: "兼具悬挂式 Dark Ride 的慢速精准运镜与悬挂过山车的高速飞翔体感。",
              demoYtId: "QyIBU2Dhfvc",
              parks: [
                { label: "欧洲四大标杆", items: "德国 Europa-Park《Arthur (亚瑟王国)》、德国 Phantasialand《F.L.Y. (前段地下直立悬挂 Dark Ride + 90°翻转飞行弹射)》" },
                { label: "迪拜与阿布扎比", items: "迪拜 Motiongate《驯龙高手：飞龙滑翔机 (Dragon Gliders)》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c4",
      title: "门类四：垂直井道升降导轨系统 (Vertical Shaft Dark Rides)",
      subtitle: "2级嵌套 · 以垂直电梯井道 (Z轴) 为核心导引维度",
      groups: [
        {
          groupTitle: "4.1 ~ 4.2 垂直井道与水平走廊跨界 / 多层叙事升降",
          nodes: [
            {
              code: "4.1",
              name: "垂直电梯井道 + 水平地面 AGV 走廊三维跨界系统",
              support: "1号垂直爬升井道 (Z) → 五度空间水平无轨走廊 (X/Y) → 2号垂直落体井道 (Z)",
              dof: "垂直爬升 + 轿厢脱离井道水平自动行驶 + 超重力垂直下拉失重",
              mfg: "WDI / Otis / Eaton-Kenway",
              principle: "电梯轿厢升至五度空间楼层后直接脱离垂直升降平台，变成一辆水平 AGV 小车向前穿过星际走廊，随后无缝锁入第二条垂直自由落体井道高速坠落！",
              demoYtId: "6nXRJsNuuoY",
              parks: [
                { label: "迪士尼", items: "奥兰多好莱坞影城《暮光之城：惊魂古塔 (The Twilight Zone Tower of Terror 原版)》" }
              ]
            },
            {
              code: "4.2",
              name: "纯垂直井道多层开门实景 / 四面立体巨幕叙事升降系统",
              support: "40~50 米高室内垂直升降井道导轨",
              dof: "分段悬停看戏 + 高速垂直弹射与失重下拉 (Z轴)",
              mfg: "华强方特 / Intamin / Otis / S&S",
              principle: "在垂直井道内分段悬停于不同楼层高度，开启闸门呈现机械人偶全息幻象，或被 40 米高四面围合 3D 巨幕包裹演绎神话斗法。",
              demoYtId: "",
              parks: [
                { label: "中国方特", items: "太原/绵阳/宁波/荆州/厦门《神州塔》、芜湖/济南《雷峰塔》（四面围合 3D 巨幕垂直升降塔）" },
                { label: "迪士尼 & 云顶 SkyWorlds", items: "加州/东京/巴黎《银河护卫队：使命突围 / 惊魂古塔》、吉隆坡云顶《地球改造塔挑战 (Terraform Tower)》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c5",
      title: "门类五：涉水船载与水下潜艇系统 (Water & Submarine)",
      subtitle: "4级可变深度嵌套 · 含 5.1 水面浮航船 (自由漂流 / 水下牵引 / 主动多自由度) 与 5.2 真水下潜艇",
      groups: [
        {
          groupTitle: "5.1.1 水泵推流自由漂流水槽船 (Free-Floating Flume Boats)",
          nodes: [
            {
              code: "5.1.1.1",
              name: "全平缓或微跌落室内叙事水槽船 (Standard Narrative Flume)",
              support: "混凝土水渠 + 大流量水泵推流（无水下机械抓钩）",
              dof: "顺水自由漂流（含 1~2 次暗黑微跌落）",
              mfg: "WDI / Mack Rides / Intamin / 华强方特",
              principle: "结构极其可靠、每小时吞吐量最高的水上暗黑乘骑，两岸密集排布上百个实景机械人偶与光影造景。",
              demoYtId: "",
              parks: [
                { label: "迪士尼", items: "《小小世界》《加勒比海盗(经典版)》《阿凡达：纳美河之旅》《辛巴达传奇之旅》《乐佩公主天灯盛会》" },
                { label: "环球影城", items: "北京环球独占《功夫熊猫：神龙大侠之旅》" },
                { label: "中国方特", items: "《缤纷华夏》/《七彩王国》(20+园)、邯郸《成语童话》、《森林时光》、《河谷探秘》" },
                { label: "欧洲四大标杆", items: "德国 Europa-Park《巴达维亚海盗 (Piraten in Batavia)》《精灵船》" }
              ]
            },
            {
              code: "5.1.1.2",
              name: "室内暗黑实景历险 + 高空陡坡激流俯冲船 (Dark Log Flume / Rapids)",
              support: "室内暗黑水道 + 链条斜坡或垂直电梯提升 + 高空俯冲滑道",
              dof: "室内慢速漂流 + 15~26 米高空高速俯冲溅水",
              mfg: "Intamin / Mack / Hopkins / ABC Rides / Hafema / 华强方特",
              principle: "前半程至大半程为全封闭室内暗黑场景（机械恐龙、古墓坍塌、真火），结尾提升至高空陡坡俯冲。",
              demoYtId: "",
              parks: [
                { label: "迪士尼 & 环球", items: "迪士尼《蒂安娜的湾流冒险 / 飞溅山》、环球《侏罗纪公园/世界激流船》《达德利激流勇进》" },
                { label: "中国方特", items: "《逃出恐龙岛》《神秘河谷》《飞跃河谷》《勇闯恐龙谷》《仙岛探秘》《津门大峡谷》《昆仑探秘》" },
                { label: "迪拜 & 云顶 & 欧洲", items: "吉隆坡云顶《森林战士：月之谷奇幻漂流》、阿布扎比华纳《摩登原始人》、德国 Phantasialand《River Quest (双垂直电梯提升激流船)》" }
              ]
            },
            {
              code: "5.1.1.3",
              name: "水槽漂流 + 水下变轨台向后倒退俯冲船 (Switch-Track Flume)",
              support: "水道 + 水下旋转/平移变轨转盘",
              dof: "正向漂流 → 水下变轨切换船尾朝前倒退滑落 → 恢复正向",
              mfg: "Intamin / WDI",
              principle: "在剧情高潮处游船驶入水下活动转轨台，瞬间切换至倒退滑道向后俯冲跌落。",
              demoYtId: "52Ry4SULpL4",
              parks: [
                { label: "迪士尼", items: "东京海洋《安娜与艾莎的冰雪之旅 (2024)》、奥兰多/香港/巴黎《魔雪奇幻之旅 (Frozen Ever After)》" },
                { label: "欧洲四大标杆", items: "德国 Phantasialand《Chiapas (亡灵节暗黑段 + 双水下变轨倒退 + 53°最陡俯冲)》" }
              ]
            }
          ]
        },
        {
          groupTitle: "5.1.2 水下钢缆/刚性导轨牵引船 (Underwater Tow & Guided Boats)",
          nodes: [
            {
              code: "5.1.2.1",
              name: "水下闭合钢缆/刚性导轨平层牵引船 (Tow Boat)",
              support: "平静人工湖水底铺设闭合牵引钢缆或导轨",
              dof: "受控定速航行（精准触发沿岸大型机械与真火爆炸）",
              mfg: "Intamin / Universal Creative",
              principle: "水底导轨或钢缆精准控制船速与船距，确保 1.5 吨级液压大白鲨或沿岸百余个机械人偶按毫秒级时序触发。",
              demoYtId: "",
              parks: [
                { label: "环球影城", items: "日本 USJ《大白鲨 (Jaws)》" },
                { label: "欧洲四大标杆", items: "荷兰 Efteling《一千零一夜海市蜃楼 (Fata Morgana)》" }
              ]
            },
            {
              code: "5.1.2.2",
              name: "自动导引巨型游船 + 尾声数百吨真水山洪漫灌",
              support: "水下导轨牵引百人级巨船 + 舞台顶部巨型蓄水瞬时倾泻水闸",
              dof: "自动导引航行 + 停靠承接真水巨浪冲击",
              mfg: "华强方特智能技术",
              principle: "大型游船沿水下导轨穿过室内江南烟雨街巷与多块巨幕，最终停靠在金山寺舞台前，触发数百吨真水滔天巨浪迎面扑来。",
              demoYtId: "",
              parks: [
                { label: "中国方特", items: "《决战金山寺》《水漫金山》《致远 致远》(东方欲晓)《马六甲勇士》(南宁)" }
              ]
            },
            {
              code: "5.1.2.3",
              name: "室内浓雾暗黑港口船 + 水上过山车跨界系统 (Water Coaster Hybrid)",
              support: "室内暗黑水道牵引轨 + 过山车倾斜提升与俯冲钢轨",
              dof: "前半程慢速浓雾暗黑船 → 后半程高速水上过山车",
              mfg: "Kumbak / Mack Rides",
              principle: "船底同时装有浮箱与过山车钢轮；前半程在室内港口与浓雾汪洋中慢速完成暗黑叙事，后半程锁入钢轨冲顶落水。",
              demoYtId: "YSrKKqWIKLY",
              parks: [
                { label: "欧洲 & 全球标杆", items: "荷兰 Efteling《飞翔的荷兰人 (De Vliegende Hollander)》、德国 Europa-Park《波塞冬》、珠海长隆《冰山过山车》" }
              ]
            }
          ]
        },
        {
          groupTitle: "5.1.3 水下高自由度主动控制动感船 (Active Multi-DOF Boats)",
          nodes: [
            {
              code: "5.1.3.1",
              name: "水下直线电机(LSM)电磁导引全向自转横移巨船",
              support: "水底刚性变轨导轨网络 + 水下直线电机滑块 + 旋转立柱",
              dof: "水面 360° 原地自转 + 螃蟹步横移 + 急停倒退 + 逆向冲坡",
              mfg: "WDI / Intamin",
              principle: "船浮在水面，但水下深处的直线电机与旋转立柱抓持船底，赋予 30 人巨船宛如无轨车般的全向自转、横移、倒退与高速冲刺能力。",
              demoYtId: "lpX8YHcepW8",
              parks: [
                { label: "迪士尼 (上海独占)", items: "上海迪士尼乐园《加勒比海盗——沉落宝藏之战》" }
              ]
            },
            {
              code: "5.1.3.2",
              name: "水下导轨 + 万向球铰主动俯仰横滚快艇 (Mack Rocking Boat)",
              support: "水底导轨 + 水下万向球铰支撑臂 + 车载主动俯仰横滚机构",
              dof: "正倒向变速 + 船体主动大角度 Pitch 俯仰翘头 + Roll 左右剧烈横滚",
              mfg: "Mack Rides (2025 全球首发)",
              principle: "2025 全球首创：水下支撑臂通过万向节主动驱动水面快艇在暗黑漩涡中做出剧烈的左右摇摆倾斜、翘头俯仰与倒退变轨，结尾高空冲浪俯冲。",
              demoYtId: "d6srd2tchaA",
              parks: [
                { label: "欧洲四大标杆", items: "法国 Futuroscope《百慕大任务 (Mission Bermudes — 2025 全球首台投运)》" }
              ]
            }
          ]
        },
        {
          groupTitle: "5.2 真实水下潜艇系统 (Submerged Underwater Submarines)",
          nodes: [
            {
              code: "5.2",
              name: "真实水下导轨潜艇系统（潜入液面以下真鱼群水体）",
              support: "数千吨真实海水池底部导轨 + 全密闭水下耐压客舱",
              dof: "真实液面以下潜航（透过圆形舷窗直视真鲨鱼与水下 LED 幕）",
              mfg: "Mack Rides / WDI",
              principle: "与 5.1 水面船并列：游客真正走下螺旋梯进入水下密闭潜艇客舱，潜入养有数千条真鲨鱼与鳐鱼的水体液面以下，配合气泡帷幕与水下防水 LED 巨幕。",
              demoYtId: "TNy27xuP-iY",
              parks: [
                { label: "迪士尼 / 迪拜 / 长隆", items: "珠海长隆宇宙飞船《深海潜艇》、迪拜及全球乐高乐园《Submarine Adventure》、加州迪士尼《海底总动员潜艇之旅》" }
              ]
            }
          ]
        }
      ]
    }
  ],
  part2: [
    {
      id: "t1",
      title: "类别 T1：悬挂式球幕飞行影院 (Flying Theaters — 四大机械流派)",
      subtitle: "将数百名游客送入巨型球幕球心的 4 种重型机械工程流派",
      groups: [
        {
          groupTitle: "T1.1 ~ T1.4 四大机械送入构型",
          nodes: [
            {
              code: "T1.1",
              name: "顶置钢缆悬臂垂直提拉式 (Disney Soarin' 型)",
              support: "地面单层入座 → 顶部巨型悬臂桁架通过钢缆将 3 排吊篮向上翻转提拉升空",
              dof: "垂直提拉升空 + 吊篮微俯仰",
              mfg: "Dynamic Structures / WDI",
              principle: "无需爬楼梯，单层平地 3 排入座，启动后像提线木偶一样将 3 排座椅从地面拉起拼成上中下三层悬在球幕前。",
              demoYtId: "m5tYn38g7LU",
              parks: [
                { label: "全球迪士尼", items: "上海/加州/奥兰多/东京《翱翔·飞越地平线 / 飞越加州 / Fantastic Flight》" }
              ]
            },
            {
              code: "T1.2",
              name: "多层楼板水平前推悬臂式 (Brogent i-Ride / 方特伴你飞翔型)",
              support: "1/2/3 层楼板分层入座 → 液压平行四连杆悬臂将座椅水平向前推出 3~4 米",
              dof: "水平前推伸入球幕 + 座椅独立 6-DOF 俯仰/横滚/升降",
              mfg: "Brogent 智崴 / 华强方特 / Dynamic",
              principle: "目前全球普及率最高的模块化飞行影院构型（奥兰多《阿凡达：翱翔》则为三层楼板前壁降下 + 摩托跨骑式呼吸动感座舱变体）。",
              demoYtId: "8Kq4_z4A6g0",
              parks: [
                { label: "迪士尼", items: "奥兰多动物王国《阿凡达：翱翔 (Avatar Flight of Passage)》" },
                { label: "中国方特 (25+园)", items: "《伴你飞翔》《飞翔》《飞越恐龙岛》(青岛)《山海》(资阳)" },
                { label: "欧洲 & 迪拜", items: "德国 Europa-Park《Voletarium (飞越欧洲)》、阿布扎比华纳《绿灯侠》、法拉利世界《飞越意大利》" }
              ]
            },
            {
              code: "T1.3",
              name: "巨型多层钢架整体垂直拉升式 (方特飞越极限型)",
              support: "底层多层钢铁立体笼架 → 重型配重与钢缆卷扬将百人笼架整体垂直拉升十余米",
              dof: "百人钢架整体垂直拉升 + 前推入球幕",
              mfg: "华强方特智能技术",
              principle: "极具重工业震撼感的初代巨型立体笼架拉升结构。",
              demoYtId: "",
              parks: [
                { label: "中国方特", items: "芜湖/泰安/株洲/沈阳/郑州/天津/嘉峪关/大同/汕头《飞越极限》" }
              ]
            },
            {
              code: "T1.4",
              name: "水平入座 90° 整体翻转竖立式 / 180° 旋转切入式",
              support: "单层平地入座 → 90 吨巨型地板向上 90° 垂直翻起竖立（或 180° 旋转切入）",
              dof: "90° 整体甲板竖立翻转 + 6-DOF 悬空摆动",
              mfg: "Dynamic Attractions / Brogent 智崴",
              principle: "免去多层爬楼，上下客最快，且甲板 90° 翻转竖立瞬间带来极强的真实失重感！",
              demoYtId: "Zs-fO9--u8w",
              parks: [
                { label: "云顶 & 欧洲 & 乐高", items: "法国 Futuroscope《非凡之旅 (L'Extraordinaire Voyage)》、吉隆坡云顶 SkyWorlds《独立日：绝地反击》、乐高乐园《Masters of Flight》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "t2",
      title: "类别 T2：动感模拟器、全封闭球体与原地机械臂 (Simulators & Stationary)",
      subtitle: "含密闭太空舱、矩阵动感底座、360° 全封闭 LED 球体、升降旋转穹顶与原地机械臂",
      groups: [
        {
          groupTitle: "T2.1 ~ T2.7 七种固定基座动感剧场构型",
          nodes: [
            {
              code: "T2.1",
              name: "密闭式独立太空舱 6-DOF 模拟器 (Enclosed Stewart Pod)",
              support: "地面 6 自由度液压并联支腿（或旋转离心机臂）支撑全密闭机舱",
              dof: "6-DOF 俯仰/横滚/升降/平移（Mission: SPACE 含 2.5G 离心超重）",
              mfg: "WDI / Simtec / Moog",
              principle: "将 6~45 名游客关进全密闭飞船机舱内，舱内前窗投影与舱体液压作动器绝对刚性同步。",
              demoYtId: "",
              parks: [
                { label: "迪士尼", items: "《星际旅行 (Star Tours)》《千年隼：走私者逃亡》《太空任务 (Mission: SPACE)》、香港《铁甲奇侠飞行之旅》、东京《海底巡游艇》" },
                { label: "欧洲四大标杆", items: "法国 Futuroscope《勒布拉力赛 VR 6-DOF》、德国 Phantasialand 历史《Galaxy》" }
              ]
            },
            {
              code: "T2.2 / T2.3 / T2.4",
              name: "多排矩阵式动感底座 / 多层球幕顶升飞车剧场",
              support: "剧场地面矩阵排布多台 4~30 座液压动感底座正对巨幕/球幕",
              dof: "3~6 DOF 原地液压俯仰颠簸",
              mfg: "Simworx / Intamin / Brogent / 华强方特",
              principle: "包括环球《辛普森一家》球幕顶升飞车舱、《小黄人闹翻天》矩阵底座、方特《寻找鱼尾狮》《疯狂成语》《重返地球》及长隆 300 人同乘《百慕大历险》。",
              demoYtId: "",
              parks: [
                { label: "环球 / 方特 / 迪拜 / 欧洲", items: "环球《辛普森一家》《小黄人》《功夫熊猫》《吉米法伦》、方特《寻找鱼尾狮》《疯狂成语》《重返地球》《星际航班》、迪拜《饥饿游戏》、Futuroscope《Arthur 4D》《La Vienne Dynamique》" }
              ]
            },
            {
              code: "T2.5",
              name: "360° 全封闭 LED 球体内部悬挂旋转环 (Hypersphere 360°)",
              support: "直径 17 米 360° 全封闭空心 LED 球体 + 中心悬挂旋转倾斜圆环",
              dof: "Yaw 360° 旋转 + ±30° 倾斜 + 升降（脚下无地板遮挡）",
              mfg: "Intamin / Attraktion!",
              principle: "游客走过伸缩桥进入空心 LED 球体中心，桥撤回后连脚底深渊都是微间距 LED 球幕！",
              demoYtId: "nAg2c4-RzlI",
              parks: [
                { label: "迪拜与阿布扎比", items: "阿布扎比海洋世界《超球体 360° (Hypersphere 360° — 全球首台)》" }
              ]
            },
            {
              code: "T2.6",
              name: "超大型升降旋转平台 + 顶置 360° 穹顶球幕影院",
              support: "一楼大厅直径十余米液压升降旋转大平台 → 垂直升入二楼半球穹顶中心",
              dof: "百人平台垂直举升十余米 + 360° 旋转倾斜",
              mfg: "华强方特智能技术",
              principle: "方特独创构型：一楼实景预演后，整座百人圆盘缓缓垂直升起十余米并旋转倾斜，将整个观众席塞进二楼 360° 穹顶球幕中心。",
              demoYtId: "",
              parks: [
                { label: "中国方特", items: "《牛郎织女》/《天河之恋》(东方神画/国色春秋)、《西游传说》/《大闹天宫(升降球幕版)》" }
              ]
            },
            {
              code: "T2.7",
              name: "原地固定基座工业机械臂阵与室内暗黑 Flat Ride",
              support: "地脚螺栓固定于暗黑场馆地面（无路线空间位移，故不归入第一部分）",
              dof: "原地 6 轴 360° 倒立翻转 / 翻滚吊篮",
              mfg: "KUKA Robotics / Huss / Intamin",
              principle: "虽采用工业机械臂或暗黑包装，但底座固定在原地不发生穿房路线位移，属于特种动感设备。",
              demoYtId: "fA36K7u_4n0",
              parks: [
                { label: "欧洲 & 乐高 & 迪拜", items: "法国 Futuroscope《与机器人共舞 (10台原地KUKA机械臂)》、德国 Phantasialand《Talocan》《Mystery Castle》、迪拜 IMG《Thor Thunder Spin》、乐高《Power Builder》" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "t3",
      title: "类别 T3 ~ T6：旋转/行走看台、360°环幕隧道、疯屋滚筒与全息矩阵剧场",
      subtitle: "涵盖车动vs剧场动跨界看台、疯屋视错觉滚筒与佩珀尔幻象/空间魔砖矩阵",
      groups: [
        {
          groupTitle: "T3 旋转/行走看台 · T4 环幕大巴 · T5 疯屋滚筒 · T6 全息与空间矩阵",
          nodes: [
            {
              code: "T3.1",
              name: "多级行星交错倾斜升降旋转舞台 (Dynamic Motion Stage)",
              support: "16~18 米中央巨型液压倾斜升降高速旋转主转盘（嵌套 6 个自转子转盘）",
              dof: "高速旋转 (27 km/h) + 大倾角倾斜 + 垂直升降 + 行星交错自转",
              mfg: "Intamin / Dynamic Attractions",
              principle: "将百人级剧场看台本身变成一台巨型多自由度陀螺仪，配合哥特修道院实景或 360° LED 环幕+真车冲上舞台。",
              demoYtId: "i3u04ZhalaU",
              parks: [
                { label: "欧洲四大标杆", items: "荷兰 Efteling《骷髅之舞 (Danse Macabre 2024)》、法国 Futuroscope《龙卷风猎人 (Chasseurs de Tornades)》" }
              ]
            },
            {
              code: "T3.2",
              name: "有轨行走式大型阶梯看台车 (Traveling Auditorium — 45~80座)",
              support: "地面重型导轨或顶置缆车轨支撑整座 45~80 人阶梯看台",
              dof: "整座剧场看台沿轨道开进实景地宫/水晶宫前进、急退、颠簸俯仰",
              mfg: "华强方特智能技术 / WDI",
              principle: "看似坐在剧场看台上，实则整座看台装有轨道轮，真正开进多幕实景地宫或海底水晶宫中行进互动。",
              demoYtId: "",
              parks: [
                { label: "中国方特 & 迪士尼", items: "方特欢乐世界一期版《秦陵历险》、郑州方特《龙王传说(45座)》、株洲/绵阳《哪吒闹海(45座看台版)》、天津《大闹水晶宫(缆车看台版)》；奥兰多 EPCOT 历史《宇宙能量馆》" }
              ]
            },
            {
              code: "T3.3",
              name: "同心圆 360° 旋转看台与双面魔球旋转剧场",
              support: "中央 100~3000 座巨型 360° 旋转观众席转盘",
              dof: "绕中心轴 360° 定角或连续跟转运镜",
              mfg: "华强方特 / WDI / Puy du Fou / Simworx",
              principle: "观众席在中心旋转，四周被多个独立时代实景舞台、机械魔球阵列与环幕 360° 包围。",
              demoYtId: "",
              parks: [
                { label: "方特 / 迪士尼 / 迪拜 / 欧洲", items: "方特《岁月如歌》《万世春秋》《重返侏罗纪》《马尼拉马尼拉》《周易(双面旋转八卦魔球)》；迪士尼《进步旋转木马》；迪拜 IMG《绿巨人 3D》；法国 Puy du Fou" }
              ]
            },
            {
              code: "T4.1",
              name: "360° 环幕隧道车载动感桥剧场 (Immersive Tunnel)",
              support: "72~120 座大巴开进环幕隧道停在原地 + 车底整座钢铁桥梁液压抛颠",
              dof: "车辆停驻原地 + 桥面 6-DOF 液压抛起横甩",
              mfg: "Oceaneering / Dynamic / Simworx",
              principle: "利用 360° 环幕中 120 km/h 后退的峡谷画面与桥面液压颠簸，让停在原地的整车游客误以为大巴仍在狂奔。",
              demoYtId: "",
              parks: [
                { label: "环球影城 & 迪拜", items: "奥兰多/好莱坞《金刚：骷髅岛 / 金刚 360 3D》《速度与激情：超动力》、迪拜《Don: The Chase》" }
              ]
            },
            {
              code: "T5.1",
              name: "疯屋视错觉双轴滚筒剧场 (Madhouse / Haunted Swing)",
              support: "中央吊篮长椅 (±30° 微摆) + 外部整间装饰房屋滚筒 (360° 独立翻转)",
              dof: "双轴分离旋转欺骗前庭与视觉产生 360° 倒立错觉",
              mfg: "Vekoma / Mack Rides",
              principle: "长椅其实只轻轻晃动 15°~30°，但包裹游客的整座雕梁画栋的房间滚筒围绕游客 360° 翻转，让人产生身体被倒挂在天花板上的强烈视错觉！",
              demoYtId: "",
              parks: [
                { label: "欧洲三大名园 & 华侨城", items: "荷兰 Efteling《Villa Volta (现代疯屋鼻祖)》、德国 Phantasialand《封神宫 (Feng Ju Palace 中式神话疯屋)》、德国 Europa-Park《卡珊德拉的诅咒》、北京欢乐谷《特洛伊木马》" }
              ]
            },
            {
              code: "T6.1 ~ T6.7",
              name: "佩珀尔全息幻象 / 千块空间魔砖矩阵 / 无轨道具车特技剧场",
              support: "45° 隐形全息反射膜 / 上千台高速伺服卷扬机矩阵 / 高速 AGV 实景道具车",
              dof: "虚实演员同台化蝶消失 + 千块空中魔砖魔球变幻坍塌",
              mfg: "华强方特智能技术 / Universal Creative / Kraftwerk",
              principle: "涵盖方特独步全球的传统文化全息幻象剧场群与空间矩阵动雕剧场，以及环球无轨道具车特技秀。",
              demoYtId: "",
              parks: [
                { label: "中国方特 & 环球 & 欧洲", items: "T6.1 全息幻象：方特《聊斋》《梁祝》《骠国乐》《屈原》《黄粱一梦》《青铜祭》；T6.2 空间矩阵：方特《孟姜女》《千岛之歌》《飞翔之歌》《楚乐》；T6.4 环球《杰森·伯恩特技秀》；T6.6 法国 Futuroscope《紧闭双眼(全黑盲人体验馆)》" }
              ]
            }
          ]
        }
      ]
    }
  ],
  visualAndInteraction: [
    { type: "视觉演艺", name: "1. 纯实景 + A-1000 仿生机械人偶", desc: "零屏幕或隐形背景幕，纯靠数十自由度高帧率电动/液压硅胶仿生人偶与建筑级实景。", examples: "迪士尼《阿凡达：纳美河》《美女与野兽》《冰雪奇缘》；环球《Monsters Unchained》；Efteling《Symbolica》" },
    { type: "视觉演艺", name: "2. 动态视点透视矫正 3D (Squinching)", desc: "根据移动车辆实时坐标逆向扭曲 3D 投影，使屏幕内虚拟空间与窗外真实砖墙严丝合缝。", examples: "环球《蜘蛛侠》《变形金刚》；吉隆坡 SkyWorlds《猩球崛起》；方特《女娲补天》《恐龙危机》" },
    { type: "视觉演艺", name: "3. 无轨多自由度车 + 内凹倾斜球幕悬崖停靠", desc: "无轨动感车驶入内凹倾斜球幕深坑边缘遮蔽地面参照，结合前倾俯仰与 3D 航拍光流模拟飞翔。", examples: "中国方特《神画》《千古风华》（《千里江山图》段）、《石窟奇遇》" },
    { type: "视觉演艺", name: "4. 随车旋转移动球幕转盘 (Carousel of Domes)", desc: "多个独立半球幕安装在巨型旋转木马转盘上，与 KUKA 机械臂小车同步旋转移动包裹视线。", examples: "环球《哈利·波特与禁忌之旅》" },
    { type: "视觉演艺", name: "5. 2.5D 裸眼全屋激光投影映射", desc: "免 3D 眼镜，用数十台激光投影机将整个纯白立体物理布景变成瞬间变幻的卡通画布。", examples: "迪士尼《米奇与米妮的逃亡铁路》" },
    { type: "视觉演艺", name: "6. 佩珀尔全息幻象 (Pepper's Ghost)", desc: "利用 45° 隐形玻璃或半透膜，将暗室发光体或高流明投影叠加到真实场景或真人演员旁。", examples: "方特《聊斋》《梁祝》《屈原》；迪士尼《幽灵公馆》《迷离大宅》《海底总动员》" },
    { type: "视觉演艺", name: "7. 真水体真鱼群 + 水下防水 LED 巨幕", desc: "前景为数千吨真海水与数万条真鲨鱼，远景深海火山口内嵌入水下超高清防水 LED 巨幕。", examples: "珠海长隆宇宙飞船《深海潜艇》；迪拜及全球乐高乐园《Submarine Adventure》" },
    { type: "玩家交互", name: "1. 红外/激光固定靶点射击", desc: "射击实景人偶身上的光电二极管靶点，触发物理机械动作并计分。", examples: "迪士尼《巴斯光年》；Europa-Park《亚特兰蒂斯》；方特《宇宙小勇士》" },
    { type: "玩家交互", name: "2. 3D 屏幕虚拟弹道射击", desc: "拉绳或扣扳机向 3D 屏幕发射可见抛物线彩球、奶油球或手电筒光波。", examples: "迪士尼《玩具总动员》；Phantasialand《Maus au Chocolat》；云顶《博物馆奇妙夜》；方特《熊出没历险》" },
    { type: "玩家交互", name: "3. 手电筒捉迷藏触发（无计分压力）", desc: "用手电筒光束照射怪兽安全帽唤醒隐藏机械人偶，专注探索乐趣。", examples: "东京迪士尼《怪兽电力公司“迷藏巡游车”》" },
    { type: "玩家交互", name: "4. 双轨双车 PVP 互射对抗", desc: "两车并排竞速，射击对方车顶红色排气管可令对方整辆车失控 360° 狂转无法瞄准。", examples: "奥兰多环球影城《黑衣人：外星人攻击》" },
    { type: "玩家交互", name: "5. 徒手手势捕捉与面部实时映射", desc: "免持枪，红外深度摄像头识别徒手吐丝手势射网，或把乘客表情实时映射成虚拟小狗。", examples: "迪士尼《蜘蛛侠 WEB SLINGERS》；乐高《幻影忍者》；好莱坞环球《爱宠大机密》" },
    { type: "玩家交互", name: "6. AR 头显 + 物理实景叠加射击", desc: "佩戴双目波导 AR 头显，在真实立体赛道与布景上叠加虚拟库巴与龟壳弹道。", examples: "环球影城《马力欧卡丁车：库巴的挑战》" },
    { type: "玩家交互", name: "7. NFC 手机互联 RPG 养成射击", desc: "脉冲枪贴合手机 App NFC，支持跨次游玩累积经验值、升级武器插件与收集藏品。", examples: "奥兰多环球影城《小黄人恶人大会》" },
    { type: "玩家交互", name: "8. 职业分工驾驶 / 排队自主选线分支", desc: "6 人分任飞行员/炮手/工程师并影响走廊战损；或排队自主选择 3 条截然不同的路线分支。", examples: "迪士尼《千年隼：走私者逃亡》；荷兰 Efteling《Symbolica》；奥兰多海洋世界《企鹅帝国》" }
  ]
};
