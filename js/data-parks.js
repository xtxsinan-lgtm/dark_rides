// Complete Part 3: Exhaustive Global Park-by-Park Matrices (12 Major Park Groups)
window.PARK_MATRIX_DATA = {
  disney: {
    title: "3.1 全球迪士尼（6 大度假区 12 座乐园）Dark Ride 与暗黑剧场全项目盘点表",
    headers: ["度假区与乐园名称", "行进式 Dark Ride（含跨界水道 / 叙事过山车 / 潜艇）", "暗黑剧场、飞行影院与动感模拟器项目"],
    rows: [
      {
        col1: "加州迪士尼度假区<br><strong>1. Disneyland Park（加州主园）</strong>",
        col2: [
          "<strong>Star Wars: Rise of the Resistance</strong>（<code>2.3</code> 无轨车 + 接驳船模拟器 + 垂直自由落体跳楼机）",
          "<strong>Indiana Jones Adventure: Temple of the Forbidden Eye</strong>（<code>1.1.2.3</code> 12 座 EMV 液压越野吉普古墓探险）",
          "<strong>Mickey & Minnie's Runaway Railway</strong>（<code>2.1</code> 无轨车自动解钩分道 + 2.5D 裸眼全屋激光映射）",
          "<strong>Pirates of the Caribbean</strong> & <strong>It's a Small World</strong>（<code>5.1.1.1</code> 室内叙事水槽船）",
          "<strong>Tiana's Bayou Adventure (原 Splash Mountain)</strong>（<code>5.1.1.2</code> 超长室内机械人偶音乐 + 高空激流俯冲船）",
          "<strong>Finding Nemo Submarine Voyage</strong>（<code>5.2</code> 真水下导轨潜艇 + 珊瑚礁气泡投影）",
          "<strong>Haunted Mansion</strong>（<code>1.1.1.2</code> Omnimover 棺材车 + 佩珀尔幻象舞厅）",
          "<strong>Peter Pan's Flight</strong>（<code>3.1</code> 顶部悬挂飞船）",
          "<strong>Snow White's Enchanted Wish</strong>、<strong>Pinocchio's Daring Journey</strong>、<strong>Mr. Toad's Wild Ride</strong>、<strong>Alice in Wonderland</strong>、<strong>The Many Adventures of Winnie the Pooh</strong>、<strong>Roger Rabbit's Car Toon Spin</strong>（<code>1.1.1.1</code> 传统地面有轨 / 方向盘自转小车）",
          "<strong>Buzz Lightyear Astro Blasters</strong>（<code>1.1.1.3</code> Omnimover + 摇杆自转 + 激光射击）"
        ],
        col3: [
          "<strong>Millennium Falcon: Smuggler's Run</strong>（<code>T2.1</code> 4 座大型转盘 6 人密闭交互驾驶模拟舱）",
          "<strong>Star Tours – The Adventures Continue</strong>（<code>T2.1</code> 40 座液压 6-DOF 太空舱 + 随机分镜）",
          "<strong>Walt Disney's Enchanted Tiki Room</strong> & <strong>Great Moments with Mr. Lincoln</strong>（<code>T6.3</code> 历史鼻祖级机械人偶剧场）"
        ]
      },
      {
        col1: "加州迪士尼度假区<br><strong>2. Disney California Adventure（加州冒险乐园）</strong>",
        col2: [
          "<strong>Radiator Springs Racers</strong>（<code>1.1.4.1</code> 室内温泉镇机械汽车人慢速叙事 + 室外 65 km/h 双轨并排竞速槽轨车）",
          "<strong>Guardians of the Galaxy – Mission: BREAKOUT!</strong>（<code>4.2</code> 垂直井道多层开门机械人偶/巨幕叙事升降系统）",
          "<strong>Toy Story Mania!</strong>（<code>1.1.1.3</code> 分批有轨高速甩转车 + 3D 拉绳弹簧射击）",
          "<strong>WEB SLINGERS: A Spider-Man Adventure</strong>（<code>1.1.1.3</code> 有轨旋转车 + 红外深度摄像头徒手射网）",
          "<strong>Monsters, Inc. Mike & Sulley to the Rescue!</strong>（<code>1.1.1.1</code> 地面有轨出租车）",
          "<strong>Under the Sea ~ Journey of the Little Mermaid</strong>（<code>1.1.1.2</code> 贝壳造型 Omnimover）",
          "<strong>Luigi's Rollickin' Roadsters</strong>（<code>2.1</code> 室外无轨编队群舞车）"
        ],
        col3: [
          "<strong>Soarin' Around the World / Over California</strong>（<code>T1.1</code> 顶置钢缆悬臂垂直提拉式球幕飞行影院全球首发地）",
          "<strong>Mickey's PhilharMagic</strong>（<code>T6.7</code> 150° 弧幕 4D 剧场）",
          "<strong>Turtle Talk with Crush</strong>（<code>T6.7</code> 实时语音面部驱动互动剧场）"
        ]
      },
      {
        col1: "奥兰多华特迪士尼世界<br><strong>3. Magic Kingdom（神奇王国）</strong>",
        col2: [
          "<strong>Pirates of the Caribbean</strong> & <strong>It's a Small World</strong>（<code>5.1.1.1</code> 室内叙事水槽船）",
          "<strong>Tiana's Bayou Adventure</strong>（<code>5.1.1.2</code> 室内机械人偶暗黑段 + 高空激流船）",
          "<strong>Haunted Mansion</strong>、<strong>Under the Sea ~ Journey of the Little Mermaid</strong>（<code>1.1.1.2</code> Omnimover）",
          "<strong>Peter Pan's Flight</strong>（<code>3.1</code> 顶部悬挂飞船）",
          "<strong>The Many Adventures of Winnie the Pooh</strong>（<code>1.1.1.1</code> 有轨微摆蜜罐车）",
          "<strong>Buzz Lightyear's Space Ranger Spin</strong>（<code>1.1.1.3</code> 有轨旋转激光射击）",
          "<strong>Seven Dwarfs Mine Train</strong>（<code>1.1.4.3</code> 摇摆矿车 + 矿洞内七个小矮人音乐机械人偶慢速 Dark Ride 段）"
        ],
        col3: [
          "<strong>Walt Disney's Carousel of Progress</strong>（<code>T3.3</code> 240 座外圈旋转看台围绕中心 4 幕时代实景舞台）",
          "<strong>Mickey's PhilharMagic</strong>（<code>T6.7</code> 4D 剧场） & <strong>Monsters, Inc. Laugh Floor</strong>（实时脱口秀）",
          "<strong>Country Bear Musical Jamboree</strong> & <strong>The Hall of Presidents</strong>（<code>T6.3</code> 机械人偶剧场）",
          "<em>历史传奇</em>：<strong>ExtraTERRORestrial Alien Encounter</strong>（<code>T6.6</code> 全黑感官剥夺束缚惊悚剧场）、<strong>20,000 Leagues Under the Sea</strong>（<code>5.2</code> 真水下潜艇）"
        ]
      },
      {
        col1: "奥兰多华特迪士尼世界<br><strong>4. EPCOT（未来世界）</strong>",
        col2: [
          "<strong>Guardians of the Galaxy: Cosmic Rewind</strong>（<code>1.1.4.2</code> Vekoma 受控全向旋转叙事过山车 Omnicoaster）",
          "<strong>Test Track</strong>（<code>1.1.4.1</code> 室内汽车测试慢速暗黑段 + 室外 105 km/h 高速倾角槽轨车）",
          "<strong>Remy's Ratatouille Adventure</strong>（<code>2.1</code> 无轨老鼠车 + 巨幕与实景厨房）",
          "<strong>Frozen Ever After</strong>（<code>5.1.1.3</code> 水槽漂流 + 水下变轨向后倒退俯冲船）",
          "<strong>Spaceship Earth</strong>（<code>1.1.1.2</code> 大球内部螺旋爬升 + 倒退倾斜下降 Omnimover）",
          "<strong>The Seas with Nemo & Friends</strong>（<code>1.1.1.2</code> Omnimover 贴真实水族馆玻璃行驶 + 佩珀尔幻象鱼群）",
          "<strong>Journey Into Imagination with Figment</strong>（<code>1.1.1.2</code>） & <strong>Gran Fiesta Tour / Living with the Land</strong>（<code>5.1.1.1</code>）"
        ],
        col3: [
          "<strong>Soarin' Around the World</strong>（<code>T1.1</code> 顶置钢缆提拉球幕飞行影院）",
          "<strong>Mission: SPACE</strong>（<code>T2.1</code> 旋转离心机臂末端 4 人密闭太空舱，制造 2.5G 持续超重）",
          "<strong>Impressions de France / Reflections of China</strong>（<code>T6.7</code> 360° 环幕 Circle-Vision 剧场）",
          "<em>历史传奇</em>：<strong>Ellen's Energy Adventure (Universe of Energy)</strong>（<code>T3.2</code> 6 台 80 座大型导引行走看台车开进恐龙实景）、<strong>Horizons</strong>（<code>3.1</code> 悬挂全向车 + 结局 3 选 1）"
        ]
      },
      {
        col1: "奥兰多华特迪士尼世界<br><strong>5. Hollywood Studios（好莱坞影城）</strong>",
        col2: [
          "<strong>Star Wars: Rise of the Resistance</strong>（<code>2.3</code> 无轨车 + 垂直自由落体跳楼机四合一跨界巨制）",
          "<strong>The Twilight Zone Tower of Terror</strong>（<code>4.1</code> 垂直电梯井 + 五度空间水平有轨 AGV 走廊行驶 + 垂直自由落体井三维跨界）",
          "<strong>Mickey & Minnie's Runaway Railway</strong>（<code>2.1</code> 无轨解钩分道 + 2.5D 全屋激光映射）",
          "<strong>Toy Story Mania!</strong>（<code>1.1.1.3</code> 有轨高速甩转车 + 3D 拉绳射击）"
        ],
        col3: [
          "<strong>Millennium Falcon: Smuggler's Run</strong>（<code>T2.1</code> 6 人分工交互驾驶模拟舱）",
          "<strong>Star Tours – The Adventures Continue</strong>（<code>T2.1</code> 40 座液压 6-DOF 模拟舱）",
          "<strong>Muppet*Vision 3D</strong>（<code>T6.7</code> 4D 剧场 + 实景机械木偶乐队与真烟花；2025.06 关闭退役以改建怪兽电力公司园区）",
          "<em>历史传奇</em>：<strong>The Great Movie Ride</strong>（<code>T3.2</code> 大型导引行走剧场车 + 真人劫持演出）、<strong>Catastrophe Canyon</strong>（<code>T6.5</code> 真水山洪爆破）"
        ]
      },
      {
        col1: "奥兰多华特迪士尼世界<br><strong>6. Animal Kingdom（动物王国）</strong>",
        col2: [
          "<strong>DINOSAUR</strong>（<code>1.1.2.3</code> 12 座 EMV 液压越野时空吉普车穿越白垩纪暗黑丛林）",
          "<strong>Na'vi River Journey</strong>（<code>5.1.1.1</code> 潘多拉荧光雨林实景漂流船 + 萨满 A-1000 仿生机械人偶）"
        ],
        col3: [
          "<strong>Avatar Flight of Passage</strong>（<code>T1.2</code> 三层楼板摩托骑姿 6-DOF 呼吸动感座舱 + 巨型球幕飞行影院）",
          "<strong>Zootopia: Better Zoogether! (原 It's Tough to be a Bug!)</strong>（<code>T6.7</code> 生命之树内部 4D 剧场 + 机械人偶）"
        ]
      },
      {
        col1: "东京迪士尼度假区<br><strong>7. Tokyo Disneyland（东京陆地）</strong>",
        col2: [
          "<strong>Enchanted Tale of Beauty and the Beast</strong>（<code>2.2.1</code> 10 座无轨大茶杯 + 车载 6-DOF 液压倾斜摇摆器）",
          "<strong>Pooh's Hunny Hunt</strong>（<code>2.1</code> 2000 年全球现代无轨鼻祖，含多车共舞与跳跳虎弹跳地板）",
          "<strong>Monsters, Inc. Ride & Go Seek!</strong>（<code>1.1.1.3</code> 3 节编组有轨旋转车 + 手电筒照亮怪兽安全帽触发机械机关）",
          "<strong>Pirates of the Caribbean</strong> & <strong>It's a Small World</strong>（<code>5.1.1.1</code>） & <strong>Splash Mountain</strong>（<code>5.1.1.2</code>）",
          "<strong>Haunted Mansion</strong>（<code>1.1.1.2</code>）、<strong>Peter Pan's Flight</strong>（<code>3.1</code>）、<strong>Snow White / Pinocchio / Roger Rabbit</strong>（<code>1.1.1.1</code>）；<em>退役改建</em>：<strong>Buzz Lightyear's Astro Blasters</strong>（2024.10 关闭，改建无敌破坏王主题射击乘骑）"
        ],
        col3: [
          "<strong>Star Tours: The Adventures Continue</strong>（<code>T2.1</code> 40 座 6-DOF 液压太空舱）",
          "<strong>Mickey's PhilharMagic</strong>（<code>T6.7</code> 4D 剧场）",
          "<strong>Country Bear Theater</strong> & <strong>The Enchanted Tiki Room</strong>（<code>T6.3</code> 机械人偶音乐剧场）"
        ]
      },
      {
        col1: "东京迪士尼度假区<br><strong>8. Tokyo DisneySea（东京海洋）</strong>",
        col2: [
          "<strong>Anna and Elsa's Frozen Journey (Fantasy Springs 2024)</strong>（<code>5.1.1.3</code> 新一代水槽漂流 + 水下变轨倒退滑落 + 顶级电动机械人偶）",
          "<strong>Peter Pan's Never Land Adventure (Fantasy Springs 2024)</strong>（<code>1.1.2.1</code> 有轨 6-DOF 动感海盗船底盘 + 巨型弧幕 3D 飞行）",
          "<strong>Rapunzel's Lantern Festival (Fantasy Springs 2024)</strong>（<code>5.1.1.1</code> 室内天灯节浪漫水道船）",
          "<strong>Journey to the Center of the Earth</strong>（<code>1.1.4.1</code> 火山地心机械熔岩怪兽慢速探险 + 陡坡高速冲刺槽轨车）",
          "<strong>Indiana Jones Adventure: Temple of the Crystal Skull</strong>（<code>1.1.2.3</code> 12 座 EMV 液压越野吉普）",
          "<strong>Sindbad's Storybook Voyage</strong>（<code>5.1.1.1</code> 百余个纯实景音乐机械人偶水槽船）",
          "<strong>Toy Story Mania!</strong>（<code>1.1.1.3</code>） & <strong>Tower of Terror</strong>（<code>4.2</code> 垂直井道多层开门叙事升降系统）",
          "<strong>Aquatopia</strong>（<code>2.1</code> 水上无轨车） & <strong>20,000 Leagues Under the Sea</strong>（<code>3.1</code> 干式伪潜艇悬挂系统：双层玻璃水泡夹层伪装深海）"
        ],
        col3: [
          "<strong>Soaring: Fantastic Flight</strong>（<code>T1.1</code> 顶置钢缆提拉球幕飞行影院）",
          "<strong>Nemo & Friends SeaRider (原 StormRider)</strong>（<code>T2.1</code> 大型 122 座液压动感潜艇模拟舱）",
          "<strong>Magic Lamp Theater</strong>（<code>T6.1</code> 真人魔术师 + 3D 屏幕神灯精灵同台互动剧场）"
        ]
      },
      {
        col1: "巴黎迪士尼度假区<br><strong>9 & 10. Disneyland Park & Disney Adventure World</strong>",
        col2: [
          "<strong>Ratatouille: The Adventure</strong>（<code>2.1</code> 全球首套无轨老鼠车 + 巨幕与实景厨房）",
          "<strong>World of Frozen: Frozen Ever After</strong>（<code>5.1.1.3</code> 水下变轨倒退漂流船）",
          "<strong>Phantom Manor</strong>（<code>1.1.1.2</code> 暗黑哥特西部版 Omnimover 鬼屋）",
          "<strong>Pirates of the Caribbean</strong> & <strong>It's a Small World</strong>（<code>5.1.1.1</code>）",
          "<strong>Peter Pan's Flight</strong>（<code>3.1</code>）、<strong>Blanche-Neige & Pinocchio</strong>（<code>1.1.1.1</code>）",
          "<strong>Buzz Lightyear Laser Blast</strong> & <strong>Spider-Man W.E.B. Adventure</strong>（<code>1.1.1.3</code>）",
          "<strong>The Twilight Zone Tower of Terror</strong>（<code>4.2</code> 垂直井道多层开门叙事升降系统）"
        ],
        col3: [
          "<strong>Star Tours: L'Aventure Continue</strong>（<code>T2.1</code> 40 座液压 6-DOF 模拟舱）",
          "<strong>Mickey's PhilharMagic</strong>（<code>T6.7</code> 4D 剧场）"
        ]
      },
      {
        col1: "香港迪士尼乐园<br><strong>11. Hong Kong Disneyland</strong>",
        col2: [
          "<strong>Mystic Manor (迷离大宅)</strong>（<code>2.1</code> 无轨 LPS 巅峰代表作：4 车编队分 A/B/C/D 四走位点观看八音盒魔法机关）",
          "<strong>Frozen Ever After (魔雪奇幻之旅)</strong>（<code>5.1.1.3</code> 水槽漂流 + 水下变轨向后俯冲船 + 新一代全电动艾莎人偶）",
          "<strong>The Many Adventures of Winnie the Pooh</strong>（<code>1.1.1.1</code>） & <strong>It's a Small World</strong>（<code>5.1.1.1</code>）",
          "<strong>Ant-Man and The Wasp: Nano Battle! (蚁人与黄蜂女)</strong>（<code>1.1.1.3</code> Omnimover + EMP 激光枪射击）"
        ],
        col3: [
          "<strong>Iron Man Experience (铁甲奇侠飞行之旅)</strong>（<code>T2.1</code> 45 座大型 6-DOF 液压飞行模拟舱飞越香港街道）",
          "<strong>Mickey's PhilharMagic</strong>（<code>T6.7</code> 4D 剧场）"
        ]
      },
      {
        col1: "上海迪士尼度假区<br><strong>12. Shanghai Disneyland</strong>",
        col2: [
          "<strong>Pirates of the Caribbean: Battle for the Sunken Treasure (加勒比海盗——沉落宝藏之战)</strong>（<code>5.1.3.1</code> 全球唯一水下电磁导引多自由度可控巨船：360° 原地自转、螃蟹步横移、倒退、逆向冲坡 + 巨幕穹顶）",
          "<strong>Zootopia: Hot Pursuit (疯狂动物城：热力追踪)</strong>（<code>2.2.1</code> 无轨 AGV + 车载俯仰摇摆与差速漂移底盘）",
          "<strong>Peter Pan's Flight (小飞侠天空奇遇)</strong>（<code>3.1</code> 升级版数控变速可停靠顶部悬挂飞船）",
          "<strong>The Many Adventures of Winnie the Pooh</strong>（<code>1.1.1.1</code>） & <strong>Voyage to the Crystal Grotto</strong>（<code>5.1.1.1</code>）",
          "<strong>Buzz Lightyear Planet Rescue (巴斯光年星际营救)</strong>（<code>1.1.1.3</code>） & <strong>Seven Dwarfs Mine Train</strong>（<code>1.1.4.3</code>）"
        ],
        col3: [
          "<strong>Soaring Over the Horizon (翱翔·飞越地平线)</strong>（<code>T1.1</code> 顶置钢缆悬臂垂直提拉式球幕飞行影院）",
          "<strong>Stitch Encounter (太空幸存者)</strong>（<code>T6.7</code> 实时互动剧场）"
        ]
      }
    ]
  },

  universal: {
    title: "3.2 全球环球影城（5 大度假区 7 大主题园，含 2025 Epic Universe）全项目分类盘点表",
    headers: ["度假区与乐园名称", "行进式 Dark Ride（含跨界水道 / 慢速叙事过山车）", "暗黑剧场、环幕大巴与动感模拟器项目"],
    rows: [
      {
        col1: "奥兰多环球影城度假区<br><strong>1. Universal Studios Florida（佛州主园）</strong>",
        col2: [
          "<strong>Harry Potter and the Escape from Gringotts (逃离古灵阁)</strong>（<code>1.1.4.2</code> 车载 360° 旋转俯仰液压底座 + 跷跷板倾斜释放轨 Tilt Track + 3D 巨幕叙事过山车）",
          "<strong>Transformers: The Ride 3D</strong>（<code>1.1.2.1</code> Oceaneering 6-DOF SCOOP 动感车 + 双层垂直升降电梯轨道段）",
          "<strong>Revenge of the Mummy</strong>（<code>1.1.4.3</code> 前半程慢速古墓机械木乃伊与真火天顶 Dark Ride + 后半程变轨倒退与 LIM 弹射）",
          "<strong>Men in Black: Alien Attack</strong>（<code>1.1.1.3</code> 双轨并排竞速有轨自转车 + 双车 PVP 互射排气管令对方失控狂转）",
          "<strong>E.T. Adventure</strong>（<code>3.1</code> 顶部悬挂 12 人自行车编队座舱飞越外星球）",
          "<strong>Villain-Con Minion Blast</strong>（<code>1.2</code> 无座舱地面连续移动传送带步道 + NFC 手机互联 RPG 脉冲枪射击）"
        ],
        col3: [
          "<strong>The Bourne Stuntacular (杰森·伯恩特技秀)</strong>（<code>T6.4</code> 340㎡ 弧形 LED 巨幕 + 高速无轨 AGV 实景道具车 + 真人特技）",
          "<strong>The Simpsons Ride (原回到未来)</strong>（<code>T2.2</code> 巨型 IMAX 半球幕 + 3 层 24 台液压剪刀叉顶升飞车舱）",
          "<strong>Despicable Me Minion Mayhem</strong> & <strong>Race Through New York Starring Jimmy Fallon</strong>（<code>T2.4</code>）",
          "<strong>Fast & Furious: Supercharged</strong>（<code>T4.1</code> Dynamic Attractions 无轨派对大巴驶入 360° 环幕隧道动感桥；DRdb 归入行进式 Car Ride，奥兰多版已关闭退役）"
        ]
      },
      {
        col1: "奥兰多环球影城度假区<br><strong>2. Islands of Adventure（冒险岛）</strong>",
        col2: [
          "<strong>Harry Potter and the Forbidden Journey (禁忌之旅)</strong>（<code>1.1.3.1</code> 地面连续导电轨 + KUKA 6 轴工业机械臂 + 随车旋转移动球幕转盘）",
          "<strong>The Amazing Adventures of Spider-Man (蜘蛛侠)</strong>（<code>1.1.2.1</code> SCOOP 车载 6-DOF 动感车 + 动态视点透视矫正 3D 鼻祖）",
          "<strong>Jurassic Park River Adventure</strong> & <strong>Dudley Do-Right's Ripsaw Falls</strong>（<code>5.1.1.2</code> 室内暗黑霸王龙贴脸 + 26 米高空俯冲激流船）",
          "<strong>The Cat in the Hat</strong>（<code>1.1.1.1</code> 有轨高速自转沙发车） & <strong>High in the Sky Seuss Trolley / Pteranodon Flyers</strong>（<code>3.1</code>）"
        ],
        col3: [
          "<strong>Skull Island: Reign of Kong (金刚：骷髅岛)</strong>（<code>T4.1</code> Oceaneering 72 座无轨自动驾驶远征大巴 + 360° 环幕隧道动感桥 + 巨型实景金刚机械头；DRdb 归入 Semi-Dark Ride Car Ride）",
          "<em>历史经典</em>：<strong>Poseidon's Fury (波塞冬之怒)</strong>（<code>T6.5</code> 步入式高压真水漩涡水幕隧道特效剧场）"
        ]
      },
      {
        col1: "奥兰多环球影城度假区<br><strong>3. Universal Epic Universe（2025 史诗宇宙新园）</strong>",
        col2: [
          "<strong>Monsters Unchained: The Frankenstein Experiment (怪物大暴走)</strong>（<code>1.1.3.1</code> 第二代高负载高角速度 KUKA 6 轴工业机械臂 + 14 个超高精度全尺寸怪兽机械人偶 + 高流明 LED 屏幕）",
          "<strong>Harry Potter and the Battle at the Ministry (魔法部之战)</strong>（<code>1.1.2.2</code> Simtec 14 座车载大行程垂直升降剪刀叉 + 6-DOF 多向飞天电梯车，免 3D 眼镜穿梭于巨型 LED 幕与食死徒机械人偶）",
          "<strong>Mario Kart: Bowser's Challenge (马力欧卡丁车)</strong>（<code>1.1.1.3</code> 双轨有轨受控旋转车 + AR 头显 + 视线瞄准射龟壳）",
          "<strong>Yoshi's Adventure (耀西的冒险)</strong>（<code>1.1.1.2</code> 连续移动 Omnimover 耀西坐骑车）"
        ],
        col3: [
          "<strong>Le Cirque Arcanus (魔法世界马戏团)</strong>（<code>T6.1/T6.3</code> 融合真人演员、巨型神奇动物机械木偶与全息投影特效的暗黑大篷车剧场）",
          "<strong>The Untrainable Dragon (驯龙高手大秀)</strong>（<code>T6.3</code> 飞越观众席头顶的巨型机械夜煞无牙仔与实景剧场）"
        ]
      },
      {
        col1: "好莱坞环球影城<br><strong>4. Universal Studios Hollywood</strong>",
        col2: [
          "<strong>Harry Potter and the Forbidden Journey</strong>（<code>1.1.3.1</code> 连续轨道 KUKA 6 轴工业机械臂）",
          "<strong>Transformers: The Ride 3D</strong>（<code>1.1.2.1</code> 车载 6-DOF 动感车 + 双层垂直升降电梯轨道）",
          "<strong>Mario Kart: Bowser's Challenge</strong>（<code>1.1.1.3</code> 双轨有轨旋转车 + AR 头显射击）",
          "<strong>The Secret Life of Pets: Off the Leash (爱宠大机密)</strong>（<code>1.1.1.2</code> 纸箱造型 Omnimover + 面部捕捉实时将乘客映射为虚拟小狗 + 64 个机械宠物）",
          "<strong>Jurassic World – The Ride</strong>（<code>5.1.1.2</code> 水下巨幕沧龙 + 机械暴虐霸王龙大战霸王龙 + 26 米俯冲水道船）",
          "<strong>Revenge of the Mummy</strong>（<code>1.1.4.3</code> 前半程慢速古墓机械木乃伊 Dark Ride + 变轨倒退弹射）"
        ],
        col3: [
          "<strong>Studio Tour (好莱坞外景之旅大巴)</strong>：内含 <strong>King Kong 360 3-D</strong> & <strong>Fast & Furious: Supercharged</strong>（<code>T4.1</code> 360° 环幕隧道动感桥）以及 <strong>Earthquake: The Big One</strong>（<code>T6.5</code> 地铁站坍塌洪水实景灾难）",
          "<strong>The Simpsons Ride</strong>（<code>T2.2</code>） & <strong>Despicable Me / DreamWorks Theatre (功夫熊猫)</strong>（<code>T2.4</code>）"
        ]
      },
      {
        col1: "日本环球影城<br><strong>5. Universal Studios Japan (USJ)</strong>",
        col2: [
          "<strong>Harry Potter and the Forbidden Journey</strong>（<code>1.1.3.1</code> 连续轨道 KUKA 6 轴工业机械臂）",
          "<strong>Mario Kart: Koopa's Challenge</strong>（<code>1.1.1.3</code> 双轨有轨旋转车 + AR 头显射击）",
          "<strong>Yoshi's Adventure</strong>（<code>1.1.1.2</code> Omnimover）",
          "<strong>Jurassic Park – The Ride</strong>（<code>5.1.1.2</code> 室内暗黑恐龙 + 26 米俯冲激流船）",
          "<strong>Jaws (全球仅存的大白鲨)</strong>（<code>5.1.2.1</code> 水下导轨牵引游船 + 暗黑船屋与油库真火爆炸大白鲨）"
        ],
        col3: [
          "<strong>Despicable Me Minion Mayhem</strong>（<code>T2.4</code> 巨幕 + 多排 8 人液压动感舱）",
          "<strong>Shrek's 4-D Adventure / Sesame Street 4-D</strong>（<code>T6.7</code> 4D 剧场）",
          "<em>历史退役</em>：<strong>The Amazing Adventures of Spider-Man</strong>（2004–2024）、<strong>Terminator 2: 3-D</strong>、<strong>Backdraft (浴火赤子情)</strong>"
        ]
      },
      {
        col1: "北京环球影城<br><strong>6. Universal Studios Beijing</strong>",
        col2: [
          "<strong>Jurassic World Adventure (侏罗纪世界大冒险 — 北京独占)</strong>（<code>1.1.2.1</code> 免 3D 眼镜纯实景+巨幕版 Oceaneering 升级型 6-DOF 动感车，含暴虐霸王龙全程追击与斜坡俯冲）",
          "<strong>Harry Potter and the Forbidden Journey</strong>（<code>1.1.3.1</code> 连续轨道 KUKA 6 轴工业机械臂）",
          "<strong>Transformers: The Ride 3D (火种源之战)</strong>（<code>1.1.2.1</code> 平层版车载 6-DOF SCOOP 动感车）",
          "<strong>Kung Fu Panda Journey of the Dragon Warrior (功夫熊猫：神龙大侠之旅 — 北京独占)</strong>（<code>5.1.1.1</code> 全室内中国风花灯水乡漂流船 + 3D 投影映射与机械人偶）"
        ],
        col3: [
          "<strong>Despicable Me Minion Mayhem (小黄人闹翻天)</strong>（<code>T2.4</code> 多排液压动感底座剧场）",
          "<strong>Lights, Camera, Action! (灯光，摄像，开拍！)</strong>（<code>T6.5</code> 张艺谋与斯皮尔伯格联合监制，室内实景狂风暴雨、巨轮撞毁与真火电影特效剧场）"
        ]
      },
      {
        col1: "新加坡环球影城<br><strong>7. Universal Studios Singapore</strong>",
        col2: [
          "<strong>Transformers: The Ride 3D</strong>（<code>1.1.2.1</code> 全球首发地，车载 6-DOF SCOOP 动感车）",
          "<strong>Revenge of the Mummy</strong>（<code>1.1.4.3</code> 前半程慢速古墓 Dark Ride + 后半程弹射过山车）",
          "<strong>Sesame Street Spaghetti Space Chase (芝麻街意大利面太空追逐)</strong>（<code>3.1</code> Intamin 顶部悬挂单轨太空飞船 Dark Ride）",
          "<strong>Jurassic Park Rapids Adventure</strong>（<code>5.1.1.2</code> 圆形皮筏激流船 + 室内暗黑恐龙电梯提升俯冲段）"
        ],
        col3: [
          "<strong>Despicable Me Minion Mayhem (2025 新开小黄人园区)</strong>（<code>T2.4</code> 动感底座剧场）",
          "<strong>Shrek 4-D Adventure</strong>（<code>T6.7</code>） & <strong>Lights, Camera, Action!</strong>（<code>T6.5</code> 台风船坞灾难特效剧场）"
        ]
      }
    ]
  },

  fantawild: {
    title: "3.3 中国方特（全国 38 座乐园）Dark Ride 与暗黑剧场全景归类表",
    headers: ["硬件门类", "机制编号与核心技术特征", "方特旗下对应项目名称（覆盖全国 38 座乐园）"],
    rows: [
      {
        col1: "<strong>门类一：地面有轨（1.1.1 旋转与射击）</strong>",
        col2: ["<code>1.1.1.1 / 1.1.1.3</code> 有轨旋转探险车 & 3D/激光互动射击车"],
        col3: [
          "<strong>有轨叙事 (1.1.1.1)</strong>：《怪奇公馆》(安阳)、《玩具屋大冒险》",
          "<strong>有轨射击 (1.1.1.3)</strong>：《熊出没历险》/《熊出没历险记》/《熊熊历险》(20+园)、《神枪手》(东方欲晓)、《百发百中》(台州/邯郸)、《宇宙小勇士》、《丛林卫士》(自贡)、《小鸡不好惹之大反击》(青岛)、《宇宙博览会》(大同/青岛)"
        ]
      },
      {
        col1: "<strong>门类一：地面有轨（1.1.2.1 SCOOP 动感车）</strong>",
        col2: ["<code>1.1.2.1</code> 车载 6-DOF 动感平台 + 360°自转 + 3D巨幕/球幕"],
        col3: [
          "《女娲补天》/《女娲传奇》、《恐龙危机》、《魔法城堡》、《哪吒闹海（东方神画 8~16座车版）》/《大闹水晶宫（芜湖东方神画版）》、《突围》、《铁道游击》、《封神》(安阳)、《拉玛传奇》(南宁)、《敦煌瑰宝》/《丝路奇遇》(嘉峪关)、《地心历险》(自贡双层)、《古蜀历险》(资阳)、《勇者之城》(台州)、《探险之旅》(宜春)/《熊出没之变形记》(淮安)"
        ]
      },
      {
        col1: "<strong>门类一：地面有轨（1.1.2.3 EMV 越野车）</strong>",
        col2: ["<code>1.1.2.3</code> 12 座多自由度越野探险吉普 + 实景古墓机关"],
        col3: [
          "<strong>《秦俑地宫》</strong>(青岛梦幻王国)、<strong>《秦陵历险（二期梦幻王国版）》</strong>(芜湖/厦门/株洲梦幻王国 —— 12 座 3×4 考古探险吉普车穿梭于兵马俑实景墓道与裸眼投影幻象，对标迪士尼《印第安纳琼斯》；区别于一期 T3.2 看台车版)"
        ]
      },
      {
        col1: "<strong>门类一：地面有轨（1.1.4.3 叙事过山车）</strong>",
        col2: ["<code>1.1.4.3</code> 全室内十八层地狱实景叙事过山车"],
        col3: [
          "<strong>《惊魂之旅》/《灵魂之旅》</strong>(芜湖/宁波/济南《目连救母》地狱主题全室内叙事过山车)"
        ]
      },
      {
        col1: "<strong>门类二：地面无轨（2.1 & 2.2.2 无轨动感球幕）</strong>",
        col2: ["<code>2.1</code> 平层无轨车 & <code>2.2.2</code> 无轨 AGV + 车载多自由度平台 + 倾斜内凹球幕/360°环幕"],
        col3: [
          "<strong>平层无轨 (2.1)</strong>：《相约下龙湾》(南宁)、《殷商往事》(安阳)",
          "<strong>无轨 + 车载多自由度 + 倾斜球幕/环幕 (2.2.2)</strong>：<strong>《神画》</strong>(太原/绵阳/鹰潭)、<strong>《千古风华》</strong>(宁波/荆州/邯郸)、<strong>《石窟奇遇》</strong>(资阳)、<strong>《火烧赤壁》</strong>(荆州无轨+360°环幕+旋转台)、<strong>《魅力戏曲》/《梨园游记》</strong>(芜湖/厦门/济南/嘉峪关)"
        ]
      },
      {
        col1: "<strong>门类三：顶部悬挂（3.3 悬挂动感舱）</strong>",
        col2: ["<code>3.3</code> 顶部悬挂 240° 抓举式多自由度动感座舱"],
        col3: [
          "<strong>《烈焰风云》/《火焰山》/《穿越火焰山》</strong>(全国十余座梦幻王国/东方神画/国色春秋/恐龙王国)"
        ]
      },
      {
        col1: "<strong>门类四：垂直井道（4.2 四面巨幕升降）</strong>",
        col2: ["<code>4.2</code> 垂直井道四面围合 3D 巨幕暗黑升降系统"],
        col3: [
          "<strong>《神州塔》</strong>(太原/绵阳/宁波/荆州/厦门)、<strong>《雷峰塔》</strong>(芜湖/济南东方神画)"
        ]
      },
      {
        col1: "<strong>门类五：涉水系统（5.1.1 & 5.1.2.2 & 5.1.3.1）</strong>",
        col2: ["<code>5.1.1.1 / 5.1.1.2</code> 漂流与激流 & <code>5.1.2.2</code> 单向导引船+真水倾泻 & <code>5.1.3.1</code> 水下导轨全向旋转动感船"],
        col3: [
          "<strong>室内慢速漂流 (5.1.1.1)</strong>：《缤纷华夏》/《七彩王国》、《成语童话》(邯郸)、《森林时光》、《河谷探秘》(自贡)",
          "<strong>室内暗黑段+高空激流 (5.1.1.2)</strong>：《逃出恐龙岛》、《神秘河谷》、《飞跃河谷》、《勇闯恐龙谷》、《仙岛探秘》、《津门大峡谷》、《昆仑探秘》",
          "<strong>单向导引巨船+真水山洪漫灌 (5.1.2.2)</strong>：<strong>《决战金山寺》</strong>、<strong>《水漫金山》</strong>、<strong>《马六甲勇士》</strong>(南宁)",
          "<strong>水下刚性导轨 + 360°全向回转支承动感船 (5.1.3.1，对标上海迪士尼加勒比海盗)</strong>：<strong>《致远 致远》</strong>(宁波/淮安/赣州方特东方欲晓、太原方特东方神画 —— 船体由水下导轨与车载全向旋转动感底盘控制，在大东沟海战巨幕穹顶与战舰残骸间完成 90° 侧转平行对轰、原地调头避险与全速前冲)"
        ]
      },
      {
        col1: "<strong>第二部分：飞行影院与动感穹顶（T1 & T2）</strong>",
        col2: ["<code>T1.2 / T1.3</code> 飞行影院 & <code>T2.3 / T2.4 / T2.6</code> 动感球幕与升降旋转穹顶"],
        col3: [
          "<strong>T1.2 前推悬臂飞行影院</strong>：《伴你飞翔》(20+园)、《飞翔》、《飞越恐龙岛》(青岛)、《山海》(资阳) · <strong>T1.3 垂直拉升钢架</strong>：《飞越极限》",
          "<strong>T2.6 升降旋转穹顶</strong>：《牛郎织女》/《天河之恋》、《西游传说》/《大闹天宫》",
          "<strong>T2.3 / T2.4 动感球幕/环幕</strong>：《疯狂成语》(邯郸)、《寻找鱼尾狮》/《动感无限》、《重返地球》、《龙宫奇遇》(徐州)、《星际航班》"
        ]
      },
      {
        col1: "<strong>第二部分：行走看台、旋转看台与全息矩阵（T3 & T6）</strong>",
        col2: ["<code>T3.2</code> 45~80座有轨行走看台车 & <code>T3.3</code> 旋转看台 & <code>T6.1 / T6.2</code> 全息与魔砖矩阵"],
        col3: [
          "<strong>T3.2 行走看台车（40~80座，DRdb 亦将其按有轨跨房间位移归入 Car Ride）</strong>：<strong>《秦陵历险（一期欢乐世界版）》</strong>、<strong>《龙王传说》</strong>(郑州 40~45座)、<strong>《哪吒闹海（株洲/绵阳 45座看台版）》</strong>、<strong>《大闹水晶宫（天津缆车看台版）》</strong>",
          "<strong>T3.3 旋转看台</strong>：《岁月如歌》、《万世春秋》(资阳)、《熊出没之重返侏罗纪》、《马尼拉马尼拉》(南宁)、《周易》(安阳双面旋转八卦魔球)",
          "<strong>T6.1 佩珀尔幻象</strong>：《聊斋》、《梁山伯与祝英台》/《千古蝶恋》、《骠国乐》(南宁)、《屈原》(荆州/长沙)、《黄粱一梦》(邯郸)、《巾帼》、《青铜祭》",
          "<strong>T6.2 空间魔砖/魔球矩阵</strong>：《孟姜女》/《长城绝恋》、《飞翔之歌》/《飞上蓝天》、《千岛之歌》(南宁)、《楚乐》(荆州/长沙)"
        ]
      }
    ]
  },

  uae: {
    title: "阿联酋主题乐园（迪拜 · 阿布扎比 7 园）全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含跨界水道 / 潜艇 / 慢速叙事过山车）", "暗黑剧场、飞行影院与动感模拟器项目"],
    rows: [
      {
        col1: "<strong>阿布扎比华纳兄弟世界<br>Warner Bros. World Abu Dhabi</strong><br>（全室内主题乐园）",
        col2: [
          "<strong>Batman: Knight Flight (蝙蝠侠：暗夜飞行)</strong>（<code>1.1.3.2</code> 全球唯一投运的 Dynamic 高速导轨底盘 + 多自由度机器人悬臂）",
          "<strong>Justice League: Warworld Attack (正义联盟)</strong>（<code>1.1.2.1</code> Oceaneering EVO 6-DOF 车载动感车 + 3D 巨幕与实景）",
          "<strong>Scooby-Doo: The Museum of Mysteries (史酷比神秘博物馆)</strong>（<code>2.1</code> ETF Ride Systems 无轨系统 + Sally Dark Rides 幽灵走廊机械机关）",
          "<strong>Ani-Mayhem (乐一通大混乱)</strong>（<code>1.1.1.3</code> 有轨受控旋转快递车 + 3D 虚拟条形码扫描枪互动射击）",
          "<strong>The Flintstones Bedrock River Adventure (摩登原始人)</strong>（<code>5.1.1.2</code> 室内石器时代机械恐龙水道船 + 跌落）"
        ],
        col3: [
          "<strong>Green Lantern: Galactic Odyssey (绿灯侠：银河奥德赛)</strong>（<code>T1.2</code> Brogent i-Ride 多层前推悬臂式球幕飞行影院）",
          "<strong>Joker Funhouse</strong>（步入式小丑机关迷宫）"
        ]
      },
      {
        col1: "<strong>迪拜好莱坞之门<br>Motiongate Dubai</strong>",
        col2: [
          "<strong>Dragon Gliders (驯龙高手：飞龙滑翔机)</strong>（<code>3.4</code> Mack 悬挂式受控动力系统全室内版，车载电机慢速旋转飞越博克岛实景 + 巨幕俯冲）",
          "<strong>Ghostbusters: Battle for New York (捉鬼敢死队)</strong>（<code>2.1</code> ETF Multi Mover 无轨车 + 质子枪 3D 互动射击）",
          "<strong>Hotel Transylvania (精灵旅社)</strong>（<code>2.1</code> ETF Multi Mover 无轨棺材马车，多车在古堡大厅共舞并分道）",
          "<strong>Smurfs Studio Tour (蓝精灵)</strong> & <strong>Shrek's Merry Fairy Tale Journey (史瑞克)</strong>（<code>1.1.1.1</code> 传统有轨 / 有轨旋转木偶剧场车）"
        ],
        col3: [
          "<strong>Panem Aerial Tour (饥饿游戏：施惠国空中之旅)</strong>（<code>T2.3</code> 大型多自由度气垫船动感平台正对巨型球幕）",
          "<strong>Kung Fu Panda: Unstoppable Awesomeness</strong>（<code>T2.4</code> Simworx 3D 多排动感平台剧场）",
          "<strong>Underworld 4D (黑夜传说)</strong>（<code>T6.7</code> 4D 多感官特效剧场）"
        ]
      },
      {
        col1: "<strong>迪拜 IMG 冒险世界<br>IMG Worlds of Adventure</strong>",
        col2: [
          "<strong>Avengers: Battle of Ultron (复仇者联盟：奥创之战)</strong>（<code>1.1.2.1</code> 车载 6-DOF 动感平台有轨车 + 3D 屏幕与实景）",
          "<strong>Forbidden Territory (失落谷：恐龙禁区)</strong>（<code>1.1.1.1</code> 有轨电动探险吉普穿过 70 只全尺寸机械恐龙暗黑雨林）"
        ],
        col3: [
          "<strong>Hulk Epsilon Base 3D (绿巨人艾普西隆基地)</strong>（<code>T3.3</code> 100 座中央 360° 旋转液压动感看台 + 360° 环幕与顶置球幕）",
          "<strong>Thor Thunder Spin</strong>（<code>T2.7</code> 室内雷神水雾声光特效固定基座 Top Spin 翻滚吊篮）",
          "<strong>Ben 10 5D Hero Time</strong>（<code>T6.7</code> 5D 特效剧场）"
        ]
      },
      {
        col1: "<strong>阿布扎比海洋世界<br>SeaWorld Abu Dhabi</strong>",
        col2: ["<em>（园内的暗黑项目以右列的球形屏幕剧场为主）</em>"],
        col3: [
          "<strong>Hypersphere 360° (超球体 360°)</strong>（<code>T2.5</code> Intamin 球形屏幕剧场，座椅环悬在球心旋转、倾斜，脚下也是画面）"
        ]
      },
      {
        col1: "<strong>阿布扎比法拉利世界<br>Ferrari World Abu Dhabi</strong>",
        col2: [
          "<strong>Mission Ferrari (法拉利使命)</strong>（<code>1.1.4.2</code> 全球唯一投运的 Dynamic SFX Coaster：集室内 3D 巨幕特工暗黑段、侧向横移滑轨 Sideways Slide、倾斜跌落轨 Tilt & Drop 与倒退弹射于一体）",
          "<strong>Benno's Great Race (本诺的大赛)</strong>（<code>1.1.1.3</code> ETF Multi Mover 有轨小车 + 无线扳手魔杖互动触发机关）",
          "<strong>Bell'Italia</strong>（<code>1.1.1.1</code> 导轨老爷车微缩景观游览）"
        ],
        col3: [
          "<strong>Viaggio in Italia (飞越意大利)</strong>（<code>T1.2</code> 多层前推悬臂式球幕飞行影院）",
          "<strong>Speed of Magic / Driving with the Champion</strong>（<code>T2.4</code> 4D 液压动感平台剧场）"
        ]
      },
      {
        col1: "<strong>迪拜乐高乐园 & 皇马世界<br>Legoland Dubai & Real Madrid World</strong>",
        col2: [
          "<strong>Submarine Adventure (乐高潜艇大冒险)</strong>（<code>5.2</code> Mack 真实水下导轨半潜艇，潜入养着鲨鱼与鳐鱼的水族池）",
          "<strong>LEGO Ninjago The Ride (幻影忍者)</strong>（<code>1.1.1.3</code> Triotech 有轨车 + 徒手手势红外捕捉射出火球雷电）",
          "<strong>Lost Kingdom Adventure</strong>（<code>1.1.1.3</code>） & <strong>The Dragon</strong>（<code>1.1.4.3</code> 前半段室内乐高城堡机械火龙慢速 Dark Ride）",
          "<strong>Real Madrid World (原宝莱坞)</strong>：<strong>Sholay: The Hunt for Gabbar Singh</strong>（<code>1.1.1.3</code> 有轨 3D 红外步枪射击）"
        ],
        col3: [
          "<strong>Real Madrid World (原宝莱坞)</strong>：<strong>Krrish: Hero's Flight</strong>（<code>T1.2</code> 球幕飞行影院）、<strong>RA.One: Unleashed</strong>（<code>T2.4</code> 4D 动感底座剧场）、<strong>Don: The Chase</strong>（<code>T4.1</code> 360° 环幕隧道车载模拟器）"
        ]
      }
    ]
  },

  "asia-other": {
    title: "亚洲其他知名主题乐园（马来西亚云顶 · 韩国乐天/爱宝 · 日本西武园/富士急 · 台湾六福村等）全项目盘点表",
    headers: ["乐园名称（国家 / 地区）", "行进式 Dark Ride（含 6-DOF 动感车 / EMV 越野吉普 / 无轨车 / 暗黑水道）", "暗黑剧场、球幕飞行影院与特种实景剧场"],
    rows: [
      {
        col1: "<strong>马来西亚云顶天城世界<br>1. Genting SkyWorlds</strong><br>（原二十世纪福斯主题乐园）",
        col2: [
          "<strong>Invasion of the Planet of the Apes (猩球崛起：入侵)</strong>（<code>1.1.2.1</code> <strong>Oceaneering 6-DOF SCOOP 动感车 + 3D 巨幕与实景</strong>：结合巨型凯撒仿生机械人偶与崩塌金门大桥实景）",
          "<strong>Ice Age: Expedition Thin Ice (冰川时代：薄冰远征)</strong>（<code>2.1 / 2.2.1</code> <strong>Oceaneering 无轨多路径分道动感系统</strong>：浮冰小车在冰洞中自由旋转穿行，躲避松鼠奎特与冰封霸王龙机械人偶）",
          "<strong>Epic Voyage to Moonhaven (森林战士：月之谷奇幻漂流)</strong>（<code>5.1.1.2</code> <strong>ABC Rides 室内暗黑发光森林 + 俯冲漂流船</strong>）",
          "<strong>Night at the Museum: Midnight Mayhem (博物馆奇妙夜：午夜大混乱)</strong>（<code>1.1.1.3</code> <strong>ETF Ride Systems / Alterface 有轨旋转巡逻车 + 3D 虚拟手电筒射击</strong>）",
          "<strong>Terraform Tower Challenge (地球改造塔挑战)</strong>（<code>4.2</code> 底部封闭暗黑声光演艺 + S&S 冲顶弹射塔） & <strong>Bigweld's Zeppelins</strong>（<code>3.1</code> Zamperla 顶部悬挂飞艇）"
        ],
        col3: [
          "<strong>Independence Day: Defiance (独立日：绝地反击)</strong>（<code>T1.4</code> <strong>Dynamic Attractions 平地入座 90° 整体翻转竖立式球幕飞行影院</strong>：太空母舰机库平层入座后整座平台向上翻转竖立切入球幕体验太空激战）"
        ]
      },
      {
        col1: "<strong>韩国首尔乐天世界 & 龙仁爱宝乐园<br>2. Lotte World Adventure & Everland</strong>",
        col2: [
          "<strong>乐天世界《Pharaoh's Fury (法老的愤怒)》</strong>（<code>1.1.2.3</code> <strong>Intamin 12 座多自由度液压越野吉普 EMV</strong>：耗资逾 500 亿韩元在室内四层兴建古埃及地下神庙崩塌、滚石与火海机关，对标迪士尼《印第安纳琼斯》）",
          "<strong>乐天世界《The Adventures of Sindbad (辛巴达的冒险)》</strong>（<code>5.1.1.2</code> <strong>Intamin 地下暗黑双坡俯冲激流船</strong>，穿行三头恶龙与宝藏洞穴机械人偶）",
          "<strong>乐天世界《Fantasy Dream (梦幻之旅)》</strong>（<code>1.1.1.1</code> 地下童话糖果世界有轨列车）、<strong>《Dragon Wild Shooting》</strong>（<code>1.1.1.3</code> 有轨射击）、<strong>《Aeronauts Balloon Ride》</strong>（<code>3.1</code> 绕室内穹顶高空环行的悬吊热气球）",
          "<strong>爱宝乐园《Shooting Ghost (射击幽灵屋)》</strong>（<code>1.1.1.3</code> 有轨旋转 + 360° 环幕幽灵激光射击） & <strong>《Flash Pang Pang》</strong>"
        ],
        col3: [
          "<strong>乐天世界《Fly Venture (飞越韩国)》</strong>（<code>T1.2</code> Brogent 巨型球幕飞行影院）",
          "<strong>乐天世界《Wild Tour (荒野丛林：怒火四驱 / 狂野之翼 / 狂野激流)》</strong>（<code>T2.3 / T2.4</code> 三联大型多自由度动感模拟器剧场群） & <strong>《Desperados》</strong>（<code>T6.7</code> 骑马 3D 互动射击剧场）",
          "<strong>爱宝乐园《Space Tour》</strong>（<code>T2.4</code> 4D 动感平台剧场） & <strong>釜山乐天世界</strong>"
        ]
      },
      {
        col1: "<strong>日本西武园游园地 & 富士急乐园 & 豪斯登堡<br>3. Seibuen, Fuji-Q Highland & Huis Ten Bosch</strong>",
        col2: [
          "<strong>富士急乐园《火影忍者×博人传 3D 射击乘骑：科学忍具道场》</strong>（<code>1.1.1.3</code> ETF 有轨旋转 3D 忍术射击车）",
          "<strong>富士急乐园《托马斯宝藏大冒险 (Thomas' Treasure Hunt)》</strong>（<code>1.1.1.1</code> 室内有轨童话探险车）",
          "<strong>志摩西班牙村《Chocobino / 堂吉诃德奇幻之旅》</strong>（<code>3.1</code> 顶部悬挂单轨奇幻飞船 Dark Ride）"
        ],
        col3: [
          "<strong>西武园游园地《Godzilla the Ride (哥斯拉 The Ride：大怪兽顶上决战 / 2025 新篇)》</strong>（<code>T1.2</code> <strong>Brogent 半球幕悬空飞行影院 × 《哥斯拉-1.0》导演山崎贵执导</strong>，公认全球叙事压迫感最强的怪兽飞行影院）",
          "<strong>富士急乐园《富士飞行社 (Fuji Airways)》</strong>（<code>T1.2</code> Brogent 富士山四季实拍球幕飞行影院，配久石让交响配乐） & <strong>《战栗迷宫：慈急综合病院》</strong>（<code>T6.6</code> 全球最长 900 米废弃医院步入式惊悚馆）",
          "<strong>长崎豪斯登堡《Horizon Adventure (洪水地平线)》</strong>（<code>T6.5</code> 室内 800 吨真水山洪倾泻模拟 17 世纪荷兰洪灾实景剧场） & <strong>《Air Cruise the Ride》</strong>（<code>T1.2</code> 8K LED 球幕飞行影院）"
        ]
      },
      {
        col1: "<strong>中国台湾六福村 & 香港海洋公园 & 越南珍珠乐园<br>4. Leofoo Village, Ocean Park HK & VinWonders</strong>",
        col2: [
          "<strong>台湾六福村《苏丹王大冒险 (Sultan's Adventure，现已停运 Defunct)》</strong>（<code>1.1.2.3</code> <strong>Intamin 12 座多自由度越野吉普 EMV</strong>：耗资 12 亿新台币打造阿拉伯皇宫地下洞穴，经历熄火失灵、旋转断桥、喷火木乃伊与巨型守护魔兽突袭）",
          "<strong>台湾九族文化村《西班牙海岸：水战船 / 无敌舰队》</strong>（<code>5.1.1.3</code> 含室内暗黑海战段与倒退转盘变轨的水上过山车）",
          "<strong>越南富国岛 VinWonders《Wrath of Zeus (宙斯之怒)》</strong>（<code>1.1.4.3</code> Vekoma 室内外古希腊冥界暗黑特效弹射过山车）"
        ],
        col3: [
          "<strong>台湾义大世界《飞越台湾》</strong> & <strong>越南芽庄 VinWonders《Flying Cinema》</strong>（<code>T1.2</code> 悬空球幕飞行影院）",
          "<strong>香港海洋公园《探索号 R》</strong>（互动 AI 深海模拟潜艇舱） & <strong>《狂野龙卷风 / 幻彩旋转马》</strong>"
        ]
      }
    ]
  },

  europe: {
    title: "欧洲知名主题乐园（Phantasialand / Efteling / Europa-Park / Futuroscope / PortAventura / Movieland / Parc Astérix / Liseberg）全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含无轨车 / 受控悬挂 / 变轨水道 / 多维暗黑过山车）", "暗黑剧场、飞行影院、疯屋（Madhouse）与实景灾难特技秀"],
    rows: [
      {
        col1: "<strong>德国 Phantasialand<br>1. 幻多奇乐园</strong>",
        col2: [
          "<strong>Maus au Chocolat</strong>（<code>1.1.1.3</code> ETF 有轨旋转 3D 奶油射击）",
          "<strong>Geister Rikscha</strong>（<code>1.1.1.2</code> 欧洲最长全地下中式神话 Omnimover）",
          "<strong>F.L.Y.</strong>（<code>3.4</code> 前段地下蒸汽朋克工厂直立慢速悬挂 Dark Ride + 90° 旋转俯身翻转飞行弹射）",
          "<strong>Chiapas</strong>（<code>5.1.1.3</code> 室内亡灵节骷髅人偶暗黑段 + 双水下变轨倒退激流船）",
          "<strong>River Quest</strong>（<code>5.1.1.2</code> 室内古堡垂直电梯提升 + 暗黑漩涡激流船）",
          "<em>退役经典</em>：<strong>Hollywood Tour</strong>（<code>5.1.1.1</code> 室内电影水槽船）、<strong>Silbermine</strong>（<code>1.1.1.2</code> 银矿列车）、<strong>1001 Nacht</strong>（<code>3.1</code> 悬挂飞毯）"
        ],
        col3: [
          "<strong>Feng Ju Palace 封神宫</strong>（<code>T5.1</code> Vekoma 中式神话疯屋滚筒剧场）",
          "<strong>Talocan</strong> & <strong>Mystery Castle</strong>（<code>T2.7</code> 全室内阿兹特克水火特效固定基座翻滚吊篮 & 古堡地牢 65 米气压弹射塔）",
          "<strong>Residenz Theater</strong>（<code>T6.7</code> 4D 特效影院）",
          "<strong>Das verrückte Hotel Tartüff</strong>（步入式多层机械机关颠倒旅馆 Funhouse）",
          "<em>退役经典</em>：<strong>Galaxy / Race for Atlantis</strong>（<code>T2.1</code> Simtec IMAX 球幕动感模拟器）"
        ]
      },
      {
        col1: "<strong>荷兰 Efteling<br>2. 艾夫特琳童话乐园</strong>",
        col2: [
          "<strong>Symbolica</strong>（<code>2.1</code> ETF 无轨多车共舞 + 排队自主选 3 条路线分支）",
          "<strong>Droomvlucht</strong>（<code>3.2</code> 顶部悬挂变速 + 精灵沼泽高速螺旋俯冲）",
          "<strong>Fata Morgana</strong>（<code>5.1.2.1</code> Intamin 水下导引系统牵引阿拉伯一千零一夜游船）",
          "<strong>Carnaval Festival</strong>（<code>1.1.1.2</code> Mack 连续移动 Omnimover 木偶世界游历）",
          "<strong>De Vliegende Hollander</strong>（<code>5.1.2.3</code> 前半程室内 17 世纪港口与真实浓雾暗黑船 + 后半程水上过山车）"
        ],
        col3: [
          "<strong>Danse Macabre 骷髅之舞</strong>（<code>T3.1</code> 2024 新，Intamin 18 米倾斜升降高速旋转主转盘 + 6 子转盘哥特修道院剧场）",
          "<strong>Villa Volta</strong>（<code>T5.1</code> Vekoma 全球首座现代主题化疯屋滚筒剧场）",
          "<strong>Fabula (原 PandaDroom)</strong>（<code>T6.7</code> 4D 特效影院 + 树枝坠落机关）",
          "<strong>De Indische Waterlelies</strong>（<code>T6.3</code> 室内自动机械人偶音乐剧场）",
          "<em>退役经典</em>：<strong>Spookslot</strong>（<code>T6.3</code> 玻璃幕墙机械幽灵交响剧场）"
        ]
      },
      {
        col1: "<strong>德国 Europa-Park<br>3. 欧洲公园</strong>",
        col2: [
          "<strong>Arthur</strong>（<code>3.4</code> Mack 悬挂受控动力慢速旋转看戏 + 加速冲刺全球首发旗舰）",
          "<strong>Piraten in Batavia</strong>（<code>5.1.1.1</code> Mack 顶级印尼水乡水槽暗黑船）",
          "<strong>Snorri Touren</strong>（<code>1.1.1.4</code> Mack 有轨旋转车 + 两座弧幕液压动感跳台桥）",
          "<strong>Abenteuer Atlantis</strong>（<code>1.1.1.3</code> Mack Omnimover + 摇杆自转 + 激光打靶）",
          "<strong>Castello dei Medici (原 Geisterschloss)</strong> & <strong>Madame Freudenreich Curiosités</strong>（<code>1.1.1.2</code> Mack Omnimover）",
          "<strong>Schlittenfahrt Schneeflöckchen</strong> & <strong>Piccolo Mondo</strong>（<code>1.1.1.1</code> 室内有轨童话车）",
          "<strong>Elfenfahrt</strong> & <strong>Marionetten-Bootsfahrt</strong>（<code>5.1.1.1</code>） & <strong>Poseidon / Atlantica SuperSplash</strong>（<code>5.1.2.3</code>）"
        ],
        col3: [
          "<strong>Voletarium 飞越欧洲</strong>（<code>T1.2</code> Brogent i-Ride 欧洲最大双球幕飞行影院）",
          "<strong>Fluch der Kassandra</strong>（<code>T5.1</code> Mack 古希腊沉船疯屋滚筒剧场）",
          "<strong>Magic Cinema 4D</strong>（<code>T6.7</code> 大型 4D 特效影院）",
          "<strong>Historama / 旋转博物馆剧场</strong>（<code>T3.3</code> 旋转看台多媒体剧场）"
        ]
      },
      {
        col1: "<strong>法国 Futuroscope<br>4. 未来影视城</strong>",
        col2: [
          "<strong>Mission Bermudes</strong>（<code>5.1.3.2</code> 2025 年首套 Mack Rocking Boat：船体与水下导引车铰接，在无侧墙的水道与人造浪中摇摆、倒退）",
          "<strong>La Machine à voyager dans le temps (疯狂兔子时光机)</strong>（<code>1.1.1.1</code> ETF 有轨旋转震动马桶列车 + 3D 巨幕与实景搞笑交互）"
        ],
        col3: [
          "<strong>Chasseurs de Tornades 龙卷风猎人</strong>（<code>T3.1</code> Dynamic 120 座中央倾斜升降高速旋转舞台 + 360° 环形 LED 巨幕 + 真越野车上台特技）",
          "<strong>L'Extraordinaire Voyage 非凡之旅</strong>（<code>T1.4</code> Dynamic 84 座平地入座 90° 整体翻转竖立式飞行影院）",
          "<strong>Danse avec les Robots 与机器人共舞</strong>（<code>T2.7</code> 10 台 7 米高原地固定基座 KUKA 工业机械臂电音舞池）",
          "<strong>Arthur, l'Aventure 4D</strong>（<code>T2.2</code> 900㎡ IMAX 球幕 + 多层 25 座 6-DOF 液压瓢虫模拟器）",
          "<strong>La Vienne Dynamique & Dynamic!</strong>（<code>T2.4</code>） & <strong>Sébastien Loeb Racing Xperience</strong>（<code>T2.1</code> VR 6-DOF）",
          "<strong>Étincelle</strong>（<code>T6.7</code>）、<strong>Eclipse</strong>（<code>T6.3</code>）、<strong>Les Yeux Grands Fermés</strong>（<code>T6.6</code> 100% 全黑盲人体验馆）"
        ]
      },
      {
        col1: "<strong>西班牙冒险港世界<br>5. PortAventura World（含主园 & 法拉利乐园）</strong>",
        col2: [
          "<strong>Uncharted: The Enigma of Penitence (神秘海域：苦修之谜，2023)</strong>（<code>1.1.4.2</code> <strong>Intamin 欧洲首台全封闭五次弹射多维受控旋转暗黑过山车 + Sally 高仿真机械人偶</strong>：集成 5 次 LSM 弹射、车载 360° 旋转、高速变轨、倒退段与<strong>垂直自由落体侧滑跌落轨 Lateral Drop Track</strong>）",
          "<strong>Street Mission (芝麻街：曲奇神探任务，2019)</strong>（<code>2.1 + 1.1.1.3</code> <strong>Sally Dark Rides + ETF Multi Mover 埋线导引车</strong>：6 座侦探出租车穿过曲奇怪电动木偶与 8 块 3D 弧幕/360° 深海隧道幕射击寻宝）"
        ],
        col3: [
          "<strong>Templo del Fuego (烈焰神庙，2001)</strong>（<code>T6.5</code> <strong>Thinkwell + Technifex 极限真火灾难实景特技剧场</strong>：地下玛雅神庙穹顶与水面瞬间被真实烈焰吞噬，高潮时<strong>游客站立的整块石质观演平台突然气动下沉倾斜</strong>，伴随水墙冲灭烈火）",
          "<strong>Ferrari Land《Flying Dreams (飞跃法拉利梦想)》</strong>（<code>T1.2</code> Brogent i-Ride 球幕飞行影院） & <strong>《Racing Legends》</strong>（<code>T2.3</code> 敞篷 F1 赛车 6-DOF 球幕模拟器）",
          "<strong>Dino Escape 4D (原 Sea Odyssey)</strong>（<code>T2.4 / T6.7</code> 双厅 80 座大型液压潜水器模拟客舱） & <strong>El Secreto de los Mayas</strong>（<code>T6.6</code> 镜面迷宫）"
        ]
      },
      {
        col1: "<strong>意大利好莱坞电影乐园<br>6. Movieland Park (Canevaworld)</strong>",
        col2: [
          "<strong>Pangea: The World of Dinosaurs (盘古大陆：恐龙世界，2018)</strong>（<code>1.1.1.1</code> <strong>全球首创由游客真正手握方向盘与油门自驾真吉普车的恐龙 Dark Ride</strong>：在宽幅隐藏导槽与车载雷达保护下亲自操控铃木真吉普转向与加减速穿越机械霸王龙丛林）"
        ],
        col3: [
          "<strong>U-571 Submarine Simulator (U-571 潜艇极限灾难模拟器，2006–2024)</strong>（<code>T6.5 + T2.4</code> <strong>步入式真水灌舱灾难模拟器</strong>：钻入 1:1 二战鱼雷潜艇狭长舱室对坐，深水炸弹引爆时整座液压潜艇剧烈摇晃，<strong>舱顶破裂管线向乘客直接倾泻数吨高压冷水</strong>；2024.09 关闭并入 Disaster 游览线）",
          "<strong>Magma 2.1 (岩浆号重型越野卡车劫难)</strong>（<code>T3.2 + T6.5</code> 真人特技车手驾驶重型 <strong>MAN 敞篷军卡</strong>高速冲入地热发电厂灾难大厅，亲历桥面坍塌、烈焰喷射与山洪瀑布从车顶砸下）",
          "<strong>Disaster – The Blockbuster Tour (2024 新)</strong>（<code>T3.2 + T6.5</code> 双节铰接观光车穿越多座电影摄影棚亲历龙卷风与金刚袭击） & <strong>Android 3D</strong>（<code>T4.1 / T2.4</code>）"
        ]
      },
      {
        col1: "<strong>法国阿斯特里克斯公园<br>7. Parc Astérix（高卢英雄乐园）</strong>",
        col2: [
          "<strong>Épidemaïs Croisière (高卢游船)</strong>（<code>5.1.1.1 / 5.1.2.1</code> Intamin 16 座导槽漂流船，沿岸布置阿斯特里克斯漫画动态雕像与喷水机关）",
          "<strong>Menhir Express (巨石快车)</strong> & <strong>La Revanche des Pirates – Grand Splatch (2024 翻新)</strong>（<code>5.1.1.2</code> 含室内暗黑隧道与海盗机械人偶水面爆破机关的激流船）",
          "<em>历史经典</em>：<strong>Transdemonium (2003–2017)</strong>（<code>1.1.1.1</code> WGH 古堡地牢多区段变速倾斜弯道中世纪惊悚有轨车）"
        ],
        col3: [
          "<strong>Le Défi de César (凯撒的挑战，2008，2025 年起停运 SBNO)</strong>（<code>T5.1</code> <strong>Mack Rides 80 座旗舰级多厅疯屋 Madhouse</strong>：4 段式爆笑预演厅含人脸识别贴入罗马士兵漫画、晃动甲板直面三面环幕与水雾冲击的罗马战舰厅，最后进入 360° 翻转的高卢间谍船主厅）",
          "<strong>Attention Menhir! (小心巨石！4D 剧场，2019)</strong>（<code>T6.7</code> CL Corporation 300 座高动态气动升降 4D 影院 + 佩珀尔幻象预演厅）"
        ]
      },
      {
        col1: "<strong>瑞典里瑟本游乐园<br>8. Liseberg（哥德堡）</strong>",
        col2: [
          "<strong>Underlandet (兔子地底秘密王国，2021)</strong>（<code>1.1.1.1</code> <strong>Gosetto 隐藏导槽旋转车 + Quarry Fold Studio / P&P Projects 机械木偶与布景</strong>：排队区乘模拟电梯深入绿兔子的地下胡萝卜加工厂，终段车厢沿上坡提升段爬升并经投影隧道营造飞升返地错觉）",
          "<em>历史经典</em>：<strong>Sagoslottet (童话城堡，1968–2017)</strong>（<code>3.1</code> Mack 顶部悬挂单轨皇家金色飞船）"
        ],
        col3: [
          "<strong>Spökhotellet Gasten (加斯顿幽灵旅馆，1998)</strong>（<code>T6.6</code> 北欧最负盛名的步入式哥特惊悚剧场，融合真人幽灵船员、倾斜摇晃甲板地板与暗门机关）"
        ]
      }
    ]
  },

  chimelong: {
    title: "3.7 中国长隆集团（珠海宇宙飞船 / 海洋王国 / 广州长隆 / 清远长隆）Dark Ride 与暗黑剧场全项目盘点表",
    headers: ["度假区与乐园名称", "行进式 Dark Ride（含真水下潜艇 / 悬挂全向车 / 水上过山车）", "暗黑剧场、巨型动感模拟器与机械人偶大秀"],
    rows: [
      {
        col1: "<strong>珠海长隆度假区<br>1. 长隆飞船乐园 / 宇宙飞船（Chimelong Spaceship，2023）</strong><br><em>吉尼斯纪录全球最大室内主题乐园</em>",
        col2: [
          "<strong>《深海潜艇》 (Deep Sea Submarine)</strong>（<code>5.2</code> <strong>Mack Rides 真实水下有轨潜艇</strong>：8 艘 24 座半潜式真潜艇潜入养有数万条真鲨鱼、黄貂鱼的海水池，结合水下防水 LED 巨幕呈现火山与深渊奇观）",
          "<strong>《海洋单轨车》 (Ocean Monorail)</strong>（<code>3.1</code> <strong>Mack Rides 顶部单轨悬挂座舱</strong>：9 个鲸鲨/虎鲸造型吊舱环绕二层室内暗黑深海星空游乐场高空慢速穿行）",
          "<strong>《深海奇遇 / 酷比之旅》</strong>（<code>1.1.1.3</code> 结合步入式科普交互空间与 4 座地面有轨旋转射击小车）"
        ],
        col3: [
          "<strong>《百慕大历险》 (Bermuda Storm)</strong>（<code>T2.3</code> <strong>Brogent 智崴单甲板 304 座球幕动感模拟器</strong>，创吉尼斯世界纪录最大容量动感平台，配 Technifex 真水造浪与 1600㎡ 球幕，获 2024 THEA 大奖）",
          "<strong>《宇宙世界 / 飞船总动员》</strong>（<code>T2.3 / T6.3</code> “星际站台”旋转引擎与外星人机械人偶预演厅 + 金马游乐 4 台大型多自由度飞船模拟舱）",
          "<strong>《珊瑚秘境（珊瑚长老动雕秀）》</strong> & <strong>《海洋狂想曲》</strong>（<code>T6.3</code> Garner Holt 打造的高仿真珊瑚长老与数十个发光海洋生物乐队机械人偶剧场）",
          "<strong>《古海幻行》</strong>（<code>T6.1 / T6.3</code> 全息纱幕投影 + 史前巨型海洋生物模型剧场）",
          "<strong>《亚马逊风雨洪泛秀（雨林剧场）》</strong>（<code>T6.5 / T6.3</code> 室内电闪雷鸣、倾盆真雨河水暴涨实景特效 + 会说话的巨型“生命之树”动雕）",
          "<strong>《星际剧场》</strong>（<code>T6.4 / T6.7</code>） & <strong>《鲨鱼黑洞》</strong>（<code>T6.6</code>） & <strong>室内暗黑机械游乐集群</strong>（<code>T2.7</code> 《魔幻光轮》《海洋升降塔》等封装于暗黑深海造景内）"
        ]
      },
      {
        col1: "<strong>珠海长隆度假区<br>2. 长隆海洋王国（Chimelong Ocean Kingdom，2014）</strong>",
        col2: [
          "<strong>《海底互动船》 (Deep Sea Odyssey)</strong>（<code>3.1</code> <strong>Mack Rides / Dynamic 顶部悬挂连续移动全向车链</strong>：121 辆泡泡潜水器吊舱穿过深海火山动雕与球幕隧道，并<strong>直接贴窗驶入真实“鲸鲨馆”内舱</strong>近距离看真鲸鲨）",
          "<strong>《冰山过山车》 (Polar Explorer)</strong>（<code>5.1.2.3</code> <strong>Mack Rides 室内暗黑船 + 水上过山车</strong>：前半段在冰山内部暗黑冰洞与机械北极熊村庄中慢速漂流，后半段攀上冰山顶峰经历变轨与两段激流俯冲）",
          "<strong>《超级激流》 (Walrus Splash)</strong>（<code>5.1.1.3</code> <strong>Mack Rides 水下转盘变轨倒退俯冲船</strong>：海象山室内塔楼垂直旋转提升后先向后倒退跌落，再转盘变轨正向冲入巨浪）"
        ],
        col3: [
          "<strong>《5D 城堡影院（卡卡大冒险）》</strong>（<code>T6.3 / T2.4</code> <strong>Kraftwerk 1,000+ 座气动多自由度动感座椅 + 88 米宽 180° 巨型 3D 弧幕 + Garner Holt 过顶滑索机械翠鸟</strong>与两侧山体弹出式机械人偶，获 2017 THEA 大奖）"
        ]
      },
      {
        col1: "<strong>广州长隆度假区<br>3. 长隆欢乐世界（Chimelong Paradise，2006）</strong>",
        col2: [
          "<em>（园区行进式骑乘以室外大型过山车为主，室内暗黑体验集中在右列超大型动感母舰与全息多厅剧场）</em>"
        ],
        col3: [
          "<strong>《星际决战（原银河历险）》 (Alien Attack)</strong>（<code>T2.6 / T4.1</code> “铁甲金刚”巨型机械人偶预演厅 + <strong>Dynamic Attractions 180 座单平台多自由度动感母舰 + Kraftwerk 360° 环形穹幕</strong>）",
          "<strong>《森林神庙 / 梦回兰若》</strong>（<code>T6.1 / T6.6</code> 步入式多厅实景动雕惊悚剧场，融合佩珀尔全息幻象、真人演艺、大型神像/鬼怪动雕与真火风雪特效）",
          "<strong>《四维影院》</strong>（<code>T6.7</code> SimEx-Iwerks / Kraftwerk 大型 4D 动感特效影院） & <strong>《摇摆屋》</strong>（<code>T5.1</code> 轻量化室内视错觉摇摆屋）"
        ]
      },
      {
        col1: "<strong>清远长隆度假区<br>4. 长隆森林王国（Chimelong Forest Kingdom，2025）</strong>",
        col2: [
          "<em>（园区以《蒸汽火车穿越地球村》窄轨真蒸汽火车穿行万亩真动物栖息地及室外《金矿飞车》为主，暂未配置封闭式多媒体 Dark Ride）</em>"
        ],
        col3: [
          "<strong>《孖宝剧场》</strong>（室内昆虫生态科普与偶剧演艺剧场）"
        ]
      }
    ]
  },

  oct: {
    title: "3.8 中国华侨城集团（襄阳奇幻谷 / 东部华侨城 / 全国九大欢乐谷 / 卡乐星球）全项目分类盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含 6-DOF 动感车 / 互动射击 / 暗黑水道与升降塔）", "暗黑剧场、球幕飞行影院、疯屋与实景山洪灾难秀"],
    rows: [
      {
        col1: "<strong>襄阳华侨城奇幻谷<br>Fabland Xiangyang（2022）</strong><br><em>华侨城最新一代重资产科幻暗黑旗舰园</em>",
        col2: [
          "<strong>《地心历险 / 超时空营救》</strong>（<code>1.1.2.1</code> <strong>华侨城文旅科技 OCT Vision 12 座车载 6-DOF 动感探险车</strong>，沿 220 米轨道穿行火山熔岩实景与多面 3D 巨幕）",
          "<strong>《方舟大冒险》</strong>（<code>5.1.1.2</code> 诺亚方舟内部史前巨兽机械实景暗黑水道 + 26 米高空激流俯冲船）",
          "<strong>《雪山飞车》</strong>（<code>1.1.4.3</code> 金马游乐钢制矿山车，包含人造雪山内部<strong>暗黑冰洞变轨与倒退滑行段</strong>）"
        ],
        col3: [
          "<strong>《虫巢突围》 (Hive Break)</strong>（<code>T2.3 / T2.4 / T6.6</code> <strong>Triotech 全球首创双支线多厅行进式互动暗黑体验</strong>：分“星际海盗”与“赏金猎人”双线，串联全息简报室、<strong>站立式太空船动感模拟舱</strong>与 3D 射击剧场）",
          "<strong>《星际历险（裸眼 7D 飞船）》</strong> & <strong>《飞越奇幻谷》</strong>（<code>T1.2</code> OCT Vision 80~100 座悬臂式球幕飞行影院）",
          "<strong>《非常任务 / 深海探秘》</strong>（<code>T2.3</code> 4 台 30 座共 120 人大型多自由度动感潜艇模拟舱正对 3D 环幕）",
          "<strong>《觉醒战神》</strong>（<code>T6.4 / T6.5</code> 数十米高可动蒸汽朋克“机械战神”装置 + 烈火爆破水景特技剧场）"
        ]
      },
      {
        col1: "<strong>深圳东部华侨城·大侠谷<br>OCT East Knight Valley（2009）</strong>",
        col2: [
          "<strong>《地心四千哩》</strong>（<code>1.1.2.1</code> 中国本土最早投运的大型车载 6-DOF 动感有轨 Dark Ride 之一，Kraftwerk + Falcon's Creative Group 联合打造，穿行地壳断层实景与 3D 巨幕）"
        ],
        col3: [
          "<strong>《咆哮山谷》</strong>（<code>T6.5</code> 海盗小镇枪战爆破 + 山顶倾泻<strong>数千立方米真水山洪</strong>冲毁断桥与海盗船）",
          "<strong>《深海探奇》</strong>（<code>T2.6 / T6.7</code> 室内环形悬空观景廊桥 + 顶部 360° 球形天幕与四周环幕）",
          "<em>历史退役</em>：<strong>《太空迷航》</strong>（<code>T2.1</code> 巨型球幕下 12 个 4 座密闭飞船吊舱高速离心旋转升降模拟器）"
        ]
      },
      {
        col1: "<strong>深圳欢乐谷 & 深圳世界之窗<br>Happy Valley & Window of the World Shenzhen</strong>",
        col2: [
          "<strong>深圳欢乐谷《北极探险》</strong>（<code>1.1.1.3</code> <strong>1998 年中国大陆首台进口有轨互动射击 Dark Ride</strong>，Sally Dark Rides + 意大利 Barbisan 2 座雪橇车）",
          "<strong>深圳欢乐谷《炫彩伴侣 / 寻梦河》</strong>（<code>1.1.1.1 / 5.1.1.1</code> 魔幻城堡室内慢速有轨小车与童话水道船）",
          "<strong>深圳世界之窗《科罗拉多大峡谷漂流》</strong>（<code>5.1.1.2</code> 假山内部恐龙/印第安暗黑溶洞水道 + 高空激流俯冲）"
        ],
        col3: [
          "<strong>深圳欢乐谷《迷你大作战》（2023 新）</strong>（<code>T3.3 / 1.1.1.3</code> 6 辆 4 座乘骑车搭载于中央旋转转盘上，采用<strong>徒手手势红外捕捉</strong>对准多块 3D 巨幕隔空发射冲击波）",
          "<strong>深圳欢乐谷《飓风要塞》</strong> & <strong>《XD 暴风追击》</strong>（<code>T2.4</code> <strong>Triotech</strong> 气动多自由度动感座舱 + 3D 弧幕光学射击/追逐剧场）",
          "<strong>深圳欢乐谷《山洪暴发 / 地道战》</strong>（<code>T6.5</code> 百吨真水山洪冲翻卡车断桥与影视爆破实景秀） & <strong>《四维影院》</strong>（<code>T6.7</code>）",
          "<strong>深圳世界之窗《飞跃美利坚》</strong>（<code>T1.2</code> 直径 30 米巨型球幕飞行影院） & <strong>《极速富士山》</strong>（<code>T2.4</code> 动感弧幕影院）"
        ]
      },
      {
        col1: "<strong>北京欢乐谷<br>Happy Valley Beijing（2006）</strong>",
        col2: [
          "<strong>《欢乐世界》（三期奇幻海洋馆）</strong>（<code>5.1.1.1</code> <strong>北京版“小小世界”</strong>：290 米室内自由漂流水道、23 座游船穿行七大洲 37 个微缩场景与<strong>近 400 个各国动态机械木偶</strong>）",
          "<strong>《奥德赛之旅》</strong>（<code>5.1.1.2</code> 全长 800 米：前半段古希腊神庙废墟、海妖塞壬与火山喷发<strong>室内暗黑水道</strong> + 双提升 26 米高空激流俯冲）",
          "<em>历史经典</em>：<strong>《蚁国奇兵》</strong>（<code>1.1.1.1</code> 早期蚂蚁王国地下蚁穴实景有轨小车）"
        ],
        col3: [
          "<strong>《奇境：穿越北纬30度》</strong> & <strong>《飞越爱琴海》</strong>（<code>T1.2 / T1.4</code> OCT Vision 百座级水平前推球幕飞行影院 & 8 台 10 座液压悬臂举升 12 米穹幕飞行影院）",
          "<strong>《特洛伊木马》</strong>（<code>T5.1</code> 封装在巨型特洛伊木马肚子内部的双轴分离视错觉旋转疯屋 Madhouse）",
          "<strong>《魔幻剧场》</strong>（<code>T6.1</code> 45° 半透膜佩珀尔全息幻象真人互动剧场）",
          "<strong>《玛雅天灾》</strong>（<code>T6.5</code> 玛雅金字塔地裂火海 + 数千吨真水山洪倾泻） & <strong>《模拟过山车》</strong>（<code>T2.4</code>） & <strong>《皇宫影院》</strong>（<code>T6.7</code>）"
        ]
      },
      {
        col1: "<strong>上海欢乐谷 & 成都欢乐谷<br>Happy Valley Shanghai & Chengdu（2009）</strong>",
        col2: [
          "<strong>上海《暴风之旅》</strong>（<code>1.1.2.1</code> Kraftwerk 3D 视听 + 车载多自由度动感有轨探险车穿行暴风实景与巨幕）",
          "<strong>成都《熊猫侠 / 哥伦布大探险》</strong>（<code>1.1.2.1</code> OCT Vision 12 座车载 6-DOF 动感平台 + 3D 巨幕暗黑乘骑）",
          "<strong>上海《雪儿北极探险》</strong> & <strong>成都《北极探险 / 魔法小精灵》</strong>（<code>1.1.1.3</code> <strong>Sally Dark Rides</strong> 定制 6 座有轨红外射击暗黑乘骑）",
          "<strong>上海《矿山历险》</strong>（<code>1.1.4.3</code> Intamin 矿山车 + 360° 蒸汽朋克暗黑矿洞特效隧洞） & <strong>上海《峡谷漂流》/ 成都《加勒比风暴》</strong>（<code>5.1.1.2</code>）"
        ],
        col3: [
          "<strong>上海《奇境：穿越北纬30度（原飞越美利坚）》</strong> & <strong>成都《飞越西部》</strong>（<code>T1.2</code> OCT Vision 100 座三层水平前推球幕飞行影院）",
          "<strong>上海《超级飞侠剧场》</strong>（<code>T2.3 / T2.4</code> 亲子动感平台球幕剧场）",
          "<strong>上海《新上海滩风云》</strong> & <strong>成都《抓壮丁》</strong>（<code>T6.4 / T6.5</code> 影视爆破、装甲车/老爷车漂移与水火特技剧场） & <strong>两园《四维影院》</strong>（<code>T6.7</code>）"
        ]
      },
      {
        col1: "<strong>武汉 / 天津 / 重庆 / 南京 / 西安欢乐谷<br>Happy Valley Wuhan, Tianjin, Chongqing, Nanjing, Xi'an</strong>",
        col2: [
          "<strong>天津《3D 圣诞历险记 / 深海漩涡》</strong>、<strong>武汉《极速穿越》</strong>、<strong>南京《星际战舰》</strong>（<code>1.1.2.1</code> OCT Vision 车载 6-DOF 动感平台 + 3D 巨幕暗黑乘骑）",
          "<strong>重庆《狂野枪手 / 洪崖洞传说》</strong>、<strong>武汉《魔幻奇兵》</strong>、<strong>天津《巴伐利亚动物救援》</strong>、<strong>南京《饼干警长》</strong>（<code>1.1.1.3</code> 有轨旋转 3D/实景互动射击车）",
          "<strong>天津《火山探险》</strong> & <strong>南京《矿井逃生》</strong>（<code>1.1.4.3</code> 穿行室内人造火山/蒸汽朋克暗黑矿洞的矿山过山车）",
          "<strong>天津《室内激流勇进 & 峡谷漂流》</strong>（<code>5.1.1.2</code> 全室内恒温馆假山溶洞激流俯冲船）"
        ],
        col3: [
          "<strong>武汉《飞越长江》</strong>、<strong>重庆《飞越重庆》</strong>、<strong>南京《奇境：穿越北纬30度》</strong>（<code>T1.2</code> OCT Vision 100 座三层前推球幕飞行影院）",
          "<strong>天津《XD 动感影院》</strong>（<code>T2.4</code> Triotech 60 座高动态气动多自由度座椅 3D 弧幕剧场） & <strong>天津《怒海争锋》</strong>（<code>T2.6 / T4.1</code> 动感环幕剧场）",
          "<strong>武汉《打码头》</strong>、<strong>天津《津门英雄之霍元甲》</strong>、<strong>重庆《山城风云》</strong>（<code>T6.5</code> 实景水火爆破特技剧场） & <strong>各园《四维影院》</strong>（<code>T6.7</code>）"
        ]
      },
      {
        col1: "<strong>华侨城卡乐星球系列 & 顺德/扬州项目<br>OCT Visionland (柳州 / 常德 / 黄石) & 顺德欢乐海岸</strong>",
        col2: [
          "<strong>常德《圣诞奇兵》</strong>（<code>1.1.4.2</code> <strong>车载动态动感平台 + 垂直电梯提升 + 变轨滑台</strong>全室内暗黑叙事过山车）",
          "<strong>柳州《圣地古塔》</strong>、<strong>常德《大闹天宫》</strong>、<strong>黄石《天地浩劫》</strong>（<code>4.2</code> <strong>垂直井道 360° 环形立体巨幕叙事升降塔</strong>）",
          "<strong>柳州《疯狂魔术师》《时光飞车》</strong>、<strong>黄石《秘境历险》《夺宝时速》</strong>、<strong>扬州《运河天地》</strong>（<code>1.1.2.1</code> 8~12 座车载 6-DOF 动感车）",
          "<strong>黄石《郑和下西洋》</strong>（<code>5.1.1.1</code> 286 米室内水道 25 座仿古大船 + 风暴海战巨幕与真人演艺） & <strong>柳州《汽车学校》/ 黄石《疯狂农庄》</strong>（<code>1.1.1.3</code>）"
        ],
        col3: [
          "<strong>柳州/常德《神话》</strong>、<strong>黄石《女娲补天》</strong>（<code>T2.6</code> <strong>86 座巨型圆盘由底部液压支腿顶升进入 20 米高 360° 穹顶球幕，支持 180° 全向倾斜与旋转</strong>）",
          "<strong>柳州/常德《疯狂巴士》</strong>、<strong>黄石《恐龙危机》</strong>（<code>T4.1</code> <strong>48~90 座观光大巴驶入 42 米长 360° 柱面环幕隧道六自由度动感桥</strong>）",
          "<strong>柳州《太阳神鸟》</strong>、<strong>常德《奇幻博物馆》</strong>、<strong>黄石《翱翔紫禁》</strong>、<strong>顺德欢乐海岸《飞行影院》</strong>（<code>T1.2</code> 百座级球幕飞行影院）"
        ]
      }
    ]
  },

  merlin: {
    title: "3.9 英国默林娱乐集团（Alton Towers / Thorpe Park / Chessington / Gardaland / Heide Park / 全球乐高乐园）全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含地下水道 / 真水下潜艇 / 动感车 / 升降暗黑塔）", "暗黑剧场、疯屋（Madhouse）、转场地铁与步入式幻象馆"],
    rows: [
      {
        col1: "<strong>英国 Alton Towers<br>（奥尔顿塔度假区）</strong><br><em>严禁高于树冠线，深耕地底与古堡哥特 Dark Ride</em>",
        col2: [
          "<strong>The Curse at Alton Manor (奥尔顿庄园的诅咒，原 Haunted House / Duel)</strong>（<code>1.1.1.2</code> <strong>Mack Rides 定制分区变速连续发车系统</strong>：欧洲最大有轨鬼屋之一，2023 年拆除激光枪回归哥特惊悚，融合巨型佩珀尔幻象与飞头视错觉）",
          "<strong>Nemesis Sub-Terra (复仇女神：地底惊魂)</strong>（<code>4.2 + T6.6</code> <strong>ABC Rides 4 组×10 座垂直自由落体暗黑塔</strong>：深入地底观察异形巨卵孵化，巨卵爆裂瞬间极速失重坠入深渊，散场衔接防化特工惊悚追逐）",
          "<strong>Gangsta Granny: The Ride (匪徒奶奶大劫案)</strong>（<code>1.1.1.1</code> <strong>Garmendale 有轨受控旋转皇家马车</strong> + Holovis 270°/360° 投影弧幕与佩珀尔幻象）",
          "<strong>TH13TEEN (十三号古墓过山车)</strong>（<code>1.1.4.3</code> <strong>Intamin 全球首台垂直自由落体跌落轨过山车</strong>：列车倒滑冲入全黑地下古墓密室，整段轨道瞬间垂直下坠 5 米后在幽闭隧道内高速倒退）",
          "<strong>In the Night Garden Magical Boat Ride</strong>（<code>5.1.1.1</code> Mack 平底漂流船）",
          "<em>历史经典</em>：<strong>Charlie and the Chocolate Factory</strong>（<code>5.1.1.1 + T4.1</code> 前半程粉色巧克力河水道船 + 后半程换乘 35 人六面体投影全景玻璃升降机模拟器）、<strong>Toyland Tours / Around the World in 80 Days</strong>（<code>5.1.1.1</code>）"
        ],
        col3: [
          "<strong>Hex – The Legend of the Towers (古塔魔咒：锁链橡树传说)</strong>（<code>T5.1</code> <strong>Vekoma 78 座大型疯屋 Madhouse 封神作</strong>：直接以真实的 19 世纪新哥特式奥尔顿古堡遗迹作为预演厅，主厅将长椅摆动与石砌密室 360° 滚筒翻转同步）",
          "<strong>The Alton Towers Dungeon</strong>（<code>T6.6 + 5.1.1.1</code> 多厅真人地牢黑色幽默演艺 + 室内黑河幽灵船）"
        ]
      },
      {
        col1: "<strong>英国 Thorpe Park<br>（索普公园）</strong>",
        col2: [
          "<strong>X:\ No Way Out / The Walking Dead: The Ride / X</strong>（<code>1.1.4.3</code> <strong>Vekoma 室内金字塔暗黑过山车</strong>：初代为全球首台全程全黑倒退并在多个刹停点配合热风/声光惊吓的室内过山车）",
          "<em>历史经典</em>：<strong>Wicked Witches Haunt (原 Phantom Fantasia)</strong>（<code>1.1.1.2</code> Mack Omnimover 哥特鬼屋，2000 年毁于大火）、<strong>Mr. Rabbit's Tropical Travels</strong>（<code>5.1.1.1</code> Mack 室内水道船）"
        ],
        col3: [
          "<strong>Ghost Train (原 Derren Brown's Ghost Train)</strong>（<code>T4.1 + T3.2</code> <strong>Intamin / Simworx 悬空维多利亚车厢 + 内部伦敦地铁横向平移转场轨 Transfer Track</strong>，在多座实景站台与密室间秘密切换；2023 年移除 VR 改为真人特技与幻象惊悚秀，2025 年起停运）",
          "<strong>Black Mirror Labyrinth (黑镜迷宫)</strong>（<code>T6.6</code> 人脸识别实时采集游客面部照片并投射吞噬于全黑镜面迷宫中）",
          "<strong>Sunset Cinema (Pirates 4D)</strong>（<code>T6.7</code> SimEx-Iwerks 4D 影院）"
        ]
      },
      {
        col1: "<strong>英国 Chessington World of Adventures<br>（切辛顿冒险世界）</strong>",
        col2: [
          "<strong>Tomb Blaster (古墓神枪手，原 The 5th Dimension / Terror Tomb)</strong>（<code>3.1 + 1.1.1.3</code> <strong>Mack Rides 顶部单轨悬挂式 5 节编组 30 座列车（不自旋）</strong> + Lagotronics Projects 激光枪（原 Megazone），在古埃及神庙、眼镜蛇深渊与巨型木乃伊人偶间分区驻停射击）",
          "<strong>The Gruffalo River Ride Adventure (咕噜牛河漂流，原 Professor Burp's Bubbleworks)</strong>（<code>5.1.1.1</code> <strong>WGH Transportation Engineering / Leisurtec 室内圆形水道船</strong> + 投影映射雾幕与结尾标志性的拱形喷泉水柱隧道）",
          "<strong>Vampire (吸血鬼悬挂过山车)</strong>（<code>1.1.4.3 / 3.1</code> Arrow / Vekoma 哥特管风琴烛光上客大厅 + 地底暗黑隧道悬挂过山车）"
        ],
        col3: [
          "<strong>Room on the Broom – A Magical Journey (女巫扫帚排排坐)</strong>（<code>T6.1 + T6.6</code> 驻建于真实历史古宅内，通过多厅佩珀尔幻象视窗与气动机关协助女巫击退恶龙）"
        ]
      },
      {
        col1: "<strong>意大利 Gardaland<br>（加达云霄乐园）</strong><br><em>受加达湖畔限高制约，大型 Dark Ride 全部深埋地下</em>",
        col2: [
          "<strong>Jumanji – The Adventure (勇敢者游戏：丛林历险，2022，前身 La Valle dei Re / Ramses)</strong>（<code>1.1.2.1</code> <strong>Oceaneering 12 辆 6 座多自由度旋转俯仰越野吉普动感车</strong> + Garner Holt 暗河机械河马与 6.5 米高喷烟拦车石像巨怪）",
          "<strong>Animal Treasure Island / I Corsari: La Vendetta del Fantasma (海盗传奇 / 动物金银岛)</strong>（<code>5.1.1.1</code> <strong>Intamin 欧洲最大地下双层海盗水道船</strong>：整座 18 世纪海港、暴风雨海战与“整船潜入海底沉船洞穴”全数深埋于地下两层混凝土巨型掩体内）"
        ],
        col3: [
          "<strong>Magic House (魔法屋)</strong>（<code>T5.1</code> <strong>Vekoma 地下疯屋 Madhouse</strong>：隐藏在地标巨型精灵古树正下方的地底实验室，乘拟真树根电梯深入地下体验 360° 翻转）",
          "<strong>Jumanji – The Labyrinth</strong>（<code>T6.6</code> 2000 面镜子迷宫 + 全黑毒蛇声光隧道 + 象鼻喷水机关） & <strong>Time Voyagers</strong>（<code>T6.7</code> 地下 4D 动感影院）"
        ]
      },
      {
        col1: "<strong>德国 Heide Park<br>（海德公园）</strong>",
        col2: [
          "<strong>Dämonen Gruft (恶魔地穴，2024 新)</strong>（<code>1.1.1.1</code> <strong>Preston & Barbieri 地下墓穴受控旋转 4 座有轨车</strong>，结合贴脸气动怪兽、频闪错觉与车载贴耳音效）",
          "<strong>Ghostbusters 5D – Die ultimative Geisterjagd (捉鬼敢死队 5D)</strong>（<code>1.1.1.3</code> <strong>Triotech 8 座质子枪 3D 射击有轨车</strong>）"
        ],
        col3: [
          "<em>历史经典</em>：<strong>Hallo Spencer Studio</strong>（<code>T6.1 / T6.3</code> 机械木偶演播室剧场）"
        ]
      },
      {
        col1: "<strong>全球 11 座乐高乐园<br>LEGOLAND Parks（比隆 / 温莎 / 德国 / 加州 / 佛州 / 纽约 / 日本 / 迪拜 / 韩国 / 马来西亚 / 上海 2025）</strong>",
        col2: [
          "<strong>LEGO Factory Adventure Ride (乐高工厂奇幻之旅 — 纽约/韩国)</strong>（<code>2.1</code> <strong>ETF Mystic Mover 无轨车 + Holovis HoloTrac 实时动捕</strong>：在巨幕上将每位乘客本人实时变成发型衣着同步的乐高小人仔）",
          "<strong>LEGO NINJAGO The Ride (乐高幻影忍者 — 全球 11 园标配，含上海 2025)</strong>（<code>1.1.1.3</code> <strong>ART Engineering 有轨底盘 + Triotech Maestro 隔空手势感应系统</strong>：扶手内嵌 Leap Motion 红外传感器，挥手直接向 3D 巨幕投掷火球雷电）",
          "<strong>Submarine Adventure / Deep Sea Adventure (深海探险潜艇 — 温莎/德国/加州/日本/迪拜)</strong>（<code>5.2</code> <strong>Mack Rides 真水下导轨潜艇</strong>：潜入养有活体鲨鱼、鳐鱼与乐高积木遗迹的巨型室内水族池）",
          "<strong>Lost Kingdom Adventure / Laser Raiders / Kingdom Quest</strong>（<code>1.1.1.3</code> Sally / Bertazzon / ETF 古埃及或城堡有轨激光射击探险车）",
          "<strong>The Dragon (飞龙过山车 — 全球 11 园标配)</strong>（<code>1.1.4.3</code> 前半程 90 秒作为低速有轨 Dark Ride 穿越中世纪积木城堡与巨型喷烟乐高红龙人偶，后半程冲出城堡进入过山车段）",
          "<strong>Galacticoaster (星际飞车 — 加州/佛州 2026 新)</strong>（<code>1.1.4.2</code> ART Engineering 全室内太空主题受控旋转家庭过山车）"
        ],
        col3: [
          "<strong>Flight of the Sky Lion (天狮飞行影院 — 温莎)</strong>（<code>T1.2</code> <strong>Brogent i-Ride</strong> 英国首座球幕飞行影院）",
          "<strong>THE LEGO MOVIE Masters of Flight (飞行大师 — 加州/佛州/比隆)</strong>（<code>T1.4</code> <strong>Brogent m-Ride 全球首创 180° 水平旋转推出式球幕飞行影院</strong>：三层大沙发整体水平旋转 180° 悬空切入球幕）",
          "<strong>Haunted House Monster Party (怪兽派对鬼屋 — 温莎)</strong>（<code>T5.1</code> Vekoma 乐高吸血鬼晚宴疯屋 Madhouse）",
          "<strong>Ghost – The Haunted House (比隆专属)</strong>（<code>T6.6 + 4.2</code> 光学幻象鬼屋迷宫 + ABC Rides 室内迷你自由落体塔）",
          "<strong>Knights' Tournament / Power Builder</strong>（<code>T2.7</code> 原地固定 KUKA 机械臂） & <strong>LEGO Studios 4D Cinema</strong>（<code>T6.7</code> 造雪泡泡 4D 影院）"
        ]
      }
    ]
  },

  sixflags: {
    title: "3.10 美国六旗与雪松会集团（Six Flags & Cedar Fair / Cedar Point 合并集团）Dark Ride 全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含 6-DOF 射击车 / 百年矿山火车 / 玩偶水道船 / 跌落轨射击过山车）", "暗黑剧场、疯屋与历史传奇项目"],
    rows: [
      {
        col1: "<strong>原六旗集团 7 大主力乐园<br>Six Flags Magic Mountain / Great Adventure / Over Texas / Fiesta Texas / Over Georgia / Great America / St. Louis / Mexico</strong>",
        col2: [
          "<strong>Justice League: Battle for Metropolis (正义联盟：大都会之战 — 遍布 7 座六旗乐园)</strong>（<code>1.1.2.1 + 1.1.1.3</code> <strong>Oceaneering 6-DOF 动感车 + Sally 高仿真小丑/哈莉人偶 + Alterface 3D 实时射击</strong>：含真火加农炮，并在巨幕中通过底盘动作+视觉旋转完美模拟 360° 地铁桶滚翻转）",
          "<strong>Monster Mansion (怪兽庄园 — Six Flags Over Georgia 佐治亚六旗)</strong>（<code>5.1.1.1</code> 1981 年开业，现存极少数拥有<strong>超过 107 具全尺寸气动机械玩偶</strong>的传统大型室内水道船，从怪兽野餐大会误闯阴森食人怪沼泽）",
          "<strong>Pirates of Speelunker Cave (洞穴海盗历险记 — Six Flags Over Texas 德州六旗)</strong>（<code>5.1.1.1</code> 1964 年元老级水道船，2022 年由 <strong>Sally Dark Rides</strong> 全面重制，融合 56 具高仿真海盗人偶与沉浸式投影环幕）",
          "<strong>Pirates of the Deep Sea (深海海盗 — Six Flags Fiesta Texas 德州嘉年华)</strong>（<code>1.1.1.3</code> Sally 有轨激光射击海盗暗黑乘骑）",
          "<strong>The Dark Knight Coaster (黑暗骑士 — Great Adventure / Great America / Mexico)</strong>（<code>1.1.4.3</code> Mack 室内哥谭地铁野生鼠过山车 + 哈维·邓特发布会小丑劫持预演厅）",
          "<strong>Skull Mountain (Great Adventure)</strong> & <strong>Runaway Mountain (Over Texas)</strong>（<code>1.1.4.3</code> Intamin / Premier 全封闭假山骷髅洞全黑过山车）"
        ],
        col3: [
          "<strong>Houdini's Great Escape (胡迪尼大逃亡 — Great Adventure & New England)</strong>（<code>T5.1</code> <strong>美国本土仅存的两座 Vekoma Madhouse 疯屋</strong>：通灵降神会预演厅 + 维多利亚会客厅 360° 空间翻转逃脱秀）"
        ]
      },
      {
        col1: "<strong>加州诺氏百乐坊<br>Knott's Berry Farm</strong><br><em>雪松会集团 Dark Ride 绝对旗舰与美国主题乐园活化石</em>",
        col2: [
          "<strong>Calico Mine Ride (卡利科矿山火车，1960)</strong>（<code>1.1.1.1</code> <strong>Bud Hurlbut 设计 + Garner Holt 翻新，世界主题乐园史上的鼻祖级巨型假山 Dark Ride</strong>：真窄轨蒸汽造型列车深入三层人造山体，穿越沸腾泥浆池、钟乳石大溶洞与 50+ 具淘金矿工机械人偶）",
          "<strong>Timber Mountain Log Ride (伐木山激流原木船，1969)</strong>（<code>5.1.1.2</code> <strong>全球首座全主题化室内外叙事激流勇进 Log Flume</strong>：原木船穿梭于 26 米高伐木山体内部，遍布锯木厂机械人偶与蒸汽锯木机，终段室内全黑加速冲下 13 米陡坡）",
          "<strong>Knott's Bear-y Tales: Return to the Fair (诺氏小熊传说：重返集市，2021)</strong>（<code>1.1.1.3</code> <strong>Triotech 4D 互动果酱枪射击有轨车</strong>，致敬幻想工程师 Rolly Crump 1975 年初代同名经典有轨暗黑乘骑）",
          "<strong>Calico River Rapids (卡利科河峡谷漂流)</strong>（<code>5.1.1.2</code> Intamin 漂流 + Garner Holt 拓荒者、TNT 引爆互动与洞穴巨型<strong>大脚怪 Bigfoot 机械人偶</strong>）"
        ],
        col3: [
          "<em>历史传奇剧场</em>：<strong>Mystery Lodge (神秘木屋，1994–2019)</strong>（<code>T6.1</code> BRC Imagination Arts 打造、斩获 THEA 大奖的教科书级 Holavision 佩珀尔幻象剧场，印第安说书人篝火烟雾化作立体全息幻象）",
          "<em>历史经典乘骑</em>：<strong>Kingdom of the Dinosaurs (恐龙王国，1987–2004)</strong>（<code>1.1.1.1</code> Arrow 时间机器有轨车穿越 21 具巨型气动恐龙与冰封洛城）"
        ]
      },
      {
        col1: "<strong>俄亥俄州雪松点主园<br>Cedar Point</strong><br><em>世界过山车之都的历史 Dark Ride 传奇</em>",
        col2: [
          "<em>历史传奇</em>：<strong>Disaster Transport (灾难运输号，1990–2012)</strong>（<code>1.1.4.3</code> <strong>Intamin 室内太空雪橇过山车</strong>：耗资 400 万美元将雪橇过山车封装进全封闭阿拉斯加太空货运基地，配宇航控制官高仿真机械人偶与激光太空海盗暗黑滑槽）",
          "<em>历史传奇</em>：<strong>Pirate Ride (1966–1996)</strong> & <strong>Earthquake (1965–1984)</strong>（<code>1.1.1.1</code> Bud Hurlbut / Morgan Hughes 黄金时代有轨海盗船鬼屋 & 还原 1906 旧金山大地震柱体倒塌与燃气爆裂的双层老爷车暗黑乘骑）",
          "<em>涉水叙事</em>：<strong>Paddlewheel Excursions (1963–2011) / Snake River Expedition (2021–2024)</strong>（<code>5.1.2.1</code> 泻湖叙事游船 + Garner Holt 机械人偶与炸药水柱特效）"
        ],
        col3: [
          "<em>（雪松点主园现存主力全数为室外极限过山车，集团现役重型 Dark Ride 集中于诺氏百乐坊、加拿大奇幻乐园与国王岛）</em>"
        ]
      },
      {
        col1: "<strong>加拿大奇幻乐园 / 国王岛 / 国王领地 / 卡罗温兹 / 加州大美洲<br>Canada's Wonderland, Kings Island, Kings Dominion, Carowinds, California's Great America</strong>",
        col2: [
          "<strong>Wonder Mountain's Guardian (奇幻山守护者 — Canada's Wonderland，2014)</strong>（<code>1.1.4.3 + 1.1.1.3</code> <strong>ART Engineering 过山车 + Triotech 150 米超长连续 3D 屏幕侧滑射击 + 结局恶龙巢穴 9 米垂直自由落体跌落轨 Drop Track</strong>）",
          "<strong>Boo Blasters on Boo Hill (嘘嘘山幽灵猎手 — Kings Dominion / Carowinds / Canada's Wonderland 等)</strong>（<code>1.1.1.3</code> <strong>Sally Dark Rides 演艺设计 + Mack / Barbisan / Horacek 有轨车底盘</strong>；其中 Kings Island 版建筑前身为 1972 年蓝精灵水道船与 1992 年传奇歌剧幽灵 Omnimover，并计划于 2026 年升级回归为 <strong>Phantom Theater: Opening Nightmare</strong>）",
          "<strong>Flight of Fear (恐惧飞行 — Kings Island & Kings Dominion，1996)</strong>（<code>1.1.4.3</code> <strong>Premier Rides 全球首台 LIM 直线感应电机弹射过山车</strong>：51 区机库 UFO 飞碟步入式队列 + 全黑碗状太空舱内 4 次翻转）",
          "<strong>Adventure Express (冒险快车 — Kings Island)</strong>（<code>1.1.4.3</code> Arrow 矿山车，终段室内全黑玛雅神庙爬升坡两侧高大石雕守卫机械人偶挥锤高呼）"
        ],
        col3: [
          "<em>历史神作剧场</em>：<strong>Tomb Raider: The Ride / The Crypt (古墓丽影 — Kings Island，2002–2011)</strong>（<code>T2.7 / T6.5</code> <strong>全球最疯狂的室内特种机械剧场</strong>：将 Huss 77 座三排 Giant Top Spin 巨型高空翻滚机械臂完全封装在古神庙黑匣子内，在倒挂冰柱与沸腾岩浆喷泉上方作 360° 悬停翻滚）",
          "<strong>Mass Effect: New Earth (质量效应 — California's Great America)</strong>（<code>T6.1 + T6.7</code> 80 英尺 3D LED 巨幕 + 身着动力装甲的真人指挥官同台实时交火 + 4D 动感座椅）",
          "<strong>Plants vs. Zombies Garden Warfare: 3Z Arena (Carowinds)</strong>（<code>T6.7</code> Triotech 68 座双厅植物阵营 vs 僵尸阵营 3D 实时对战射击剧场）"
        ]
      }
    ]
  },

  seaworld: {
    title: "海洋世界与布什花园集团（United Parks & Resorts：SeaWorld & Busch Gardens）全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含无轨动感车 / 水路过山车 / 全室内跨骑发射过山车）", "暗黑剧场、飞行影院、动感模拟器与历史神作"],
    rows: [
      {
        col1: "<strong>奥兰多海洋世界<br>1. SeaWorld Orlando</strong>",
        col2: [
          "<strong>Antarctica: Empire of the Penguin (南极洲：企鹅帝国，2013–2020)</strong>（<code>2.2.1</code> <strong>Oceaneering 无轨 AGV + 车载 2-DOF 动感平台</strong>：乘客可在排队时自选温和或剧烈摇摆模式，无轨冰车穿过冰川声光洞穴后，直接驶入饲养有百余只真帝企鹅与王企鹅的零下极地生态馆；<em>注：无轨乘骑部分于 2020 年关闭退役，现仅保留极地企鹅生态馆</em>）",
          "<strong>Journey to Atlantis (亚特兰蒂斯之旅，1998)</strong>（<code>5.1.2.3</code> <strong>Mack Rides 全球首台水路过山车 Water Coaster</strong>：前半程作为慢速室内水道船深入沉没的亚特兰蒂斯黄金城与海妖密室，随后经历两段高空激流俯冲并切换至过山车钢轨高速滑行）",
          "<strong>Infinity Falls (无尽瀑布)</strong>（<code>5.1.1.2</code> Intamin 热带雨林激流皮筏，配备巨型垂直升降电梯塔）"
        ],
        col3: [
          "<strong>Expedition Odyssey (北极远征，2025 新)</strong>（<code>T1.4</code> <strong>Mack Rides 新一代悬空球幕飞行影院</strong>：建于原《狂野北极》场馆内，带领游客飞越北极冰盖并潜入冰海深处，散场衔接白鲸与海象真动物极地展区）",
          "<strong>TurtleTrek (海龟奇旅)</strong>（<code>T6.4</code> 360° 全景 3D 球形穹顶剧场）",
          "<em>历史经典</em>：<strong>Wild Arctic (狂野北极，1995–2024)</strong>（<code>T2.1</code> Reflectone / SimEx 大型封闭式极地喷气直升机 6-DOF 液压动感模拟客舱）"
        ]
      },
      {
        col1: "<strong>圣迭戈海洋世界 & 圣安东尼奥海洋世界<br>2. SeaWorld San Diego & San Antonio</strong>",
        col2: [
          "<strong>圣迭戈《Journey to Atlantis》</strong>（<code>5.1.2.3</code> Mack 水路过山车，配备室外垂直电梯提升塔与海底声光暗黑段）",
          "<strong>圣迭戈《Arctic Rescue (北极救援，2023)》</strong>（<code>1.1.4.3</code> Intamin 跨骑式雪地摩托过山车：以原《狂野北极》模拟馆作为室内极地科考站暗黑发射起点，经历 3 次 LSM 加速）",
          "<strong>圣迭戈《Submarine Quest》</strong>（<code>1.1.1.3</code> 互动科考潜艇车） & <strong>圣安东尼奥《Journey to Atlantis》</strong>（<code>5.1.2.3</code> Mack 旋转转盘倒退水上过山车）"
        ],
        col3: [
          "<strong>圣迭戈《Jewels of the Sea: The Jellyfish Experience (2025)》</strong>（沉浸式水母数字穹幕与活体水母光影展馆）",
          "<em>历史经典</em>：<strong>圣迭戈《Wild Arctic》</strong>（<code>T2.1</code> 极地直升机液压动感模拟舱）"
        ]
      },
      {
        col1: "<strong>威廉斯堡布什花园<br>3. Busch Gardens Williamsburg</strong>",
        col2: [
          "<strong>DarKoaster (达卡斯：狼人诅咒，2023)</strong>（<code>1.1.4.3</code> <strong>Intamin 北美首台全室内全黑跨骑式雪地摩托过山车</strong>：直接建于原《达卡斯堡的诅咒》古堡建筑内，在暴风雪与狼人幽影环伺的暗室中连续经历 4 次 LSM 直线电机弹射）",
          "<strong>Escape from Pompeii (庞贝末日，1995)</strong>（<code>5.1.1.2</code> <strong>Intamin 重型真火特效暗黑激流船</strong>：游船升入庞贝古迹室内展厅，经历石柱雕像倾倒、屋顶横梁坍塌与水面熊熊真火包围，最后冲破城门高空入水）",
          "<strong>Verbolten (禁林狂飙，2012)</strong>（<code>1.1.4.3</code> <strong>Zierer 多段发射过山车</strong>：冲入全封闭德国黑森林特效大棚，经历风暴闪电/狼人/女巫三种随机声光结局与 <strong>5.5 米垂直自由落体跌落轨 Drop Track</strong>）",
          "<strong>Loch Ness Monster (尼斯湖水怪，2024 焕新版)</strong>（<code>1.1.4.3</code> Arrow 经典双环过山车，螺旋洞穴隧道内增设尼斯湖水怪声光巨幕暗黑段）",
          "<em>历史神作</em>：<strong>Curse of DarKastle (达卡斯堡的诅咒，2005–2017)</strong>（<code>1.1.2.1</code> <strong>Oceaneering 车载 6-DOF 黄金雪橇动感车</strong> + 3D 巨幕与冰雪冷风实景，曾被公认为环球《蜘蛛侠》之外最强的第一代 SCOOP 动感暗黑乘骑）"
        ],
        col3: [
          "<strong>Battle for Eire / Europe in the Air / Corkscrew Hill / Questor</strong>（<code>T2.1 / T2.4</code> 爱尔兰园区历代大型液压动感模拟器剧场，曾先后演绎地底水晶探险、奇幻巨人与 VR 守护战）"
        ]
      },
      {
        col1: "<strong>坦帕湾布什花园<br>4. Busch Gardens Tampa Bay</strong>",
        col2: [
          "<strong>Cobra's Curse (眼镜蛇的诅咒，2016)</strong>（<code>1.1.4.2</code> <strong>Mack Rides 垂直电梯提升 + 室内暗黑叙事 + 自旋过山车</strong>：垂直升降机将列车抬升至 21 米高空，与巨型古埃及蛇王雕像毒牙贴脸对视，随后依次经历前向、倒退与自由旋转三段滑行）",
          "<strong>Stanley Falls Flume & Congo River Rapids</strong>（<code>5.1.1.2</code> 丛林原木激流船与洞穴漂流）"
        ],
        col3: [
          "<em>历史经典</em>：<strong>Akbar's Adventure Tours (阿克巴历险记)</strong>（<code>T2.1</code> 埃及集市骆驼飞毯液压动感模拟器）"
        ]
      }
    ]
  },

  "na-other": {
    title: "北美其他知名主题乐园（Dollywood / Silver Dollar City / Lagoon / Knoebels / Kennywood 等）全项目盘点表",
    headers: ["乐园名称", "行进式 Dark Ride（含全室内火灾叙事过山车 / 矿井水道打靶 / 双结局射击过山车）", "暗黑剧场、视错觉怪屋与美式黄金时代遗产"],
    rows: [
      {
        col1: "<strong>美国密苏里州银元城<br>1. Silver Dollar City（Herschend 赫申集团）</strong>",
        col2: [
          "<strong>Fire in the Hole (火烧城洞，1972 初代 / 2024 RMC 全新五层室内换代版)</strong>（<code>1.1.4.3</code> <strong>RMC 全室内叙事暗黑过山车</strong>：配备车载环绕音响，穿越被秃山帮纵火的 19 世纪矿业小镇、无裤镇长求救窗、燃烧木桥与迎面失控火车，最后冲入水池）",
          "<strong>The Flooded Mine (洪水泛滥的矿井，1968)</strong>（<code>5.1.1.1 + 1.1.1.3</code> <strong>美式主题乐园黄金时代活化石级室内水道</strong>：乘坐平底矿工铁船漂流进被地下水淹没的监狱矿井，手持激光手枪向数十具越狱囚犯机械人偶与炸药桶靶标射击，结尾经历逼真的矿井坍塌视错觉）",
          "<strong>Mystic River Falls (神秘河瀑布，2020)</strong>（<code>5.1.1.2</code> RES / Barr 4.5 层高旋转垂直电梯提升塔 + 高空激流皮筏）"
        ],
        col3: [
          "<strong>Grandfather's Mansion (祖父的怪屋)</strong>（步入式重力倾斜视错觉迷宫与怪屋 Funhouse）",
          "<strong>Marvel Cave (漫威真溶洞探险，1894)</strong>（整座银元城主题乐园正下方天然发育的巨型地下石灰岩真溶洞，含地下缆车返程）"
        ]
      },
      {
        col1: "<strong>美国田纳西州多莉山<br>2. Dollywood（Herschend 赫申集团）</strong>",
        col2: [
          "<strong>Blazing Fury (烈焰追击，1978)</strong>（<code>1.1.4.3</code> <strong>Herschend 自研镇园室内暗黑叙事过山车</strong>：与初代《火烧城洞》同源，前半程以慢速有轨暗黑乘骑方式穿越十余幕 1880 年代小镇火灾机械人偶场景，后半程在黑暗中完成三段陡坡下坠与水花飞溅）",
          "<strong>Mystery Mine (神秘矿井，2007)</strong>（<code>1.1.4.3</code> <strong>Gerstlauer 矿难暗黑段 + 垂直提升翻转过山车</strong>：矿车两度深入阴森幽暗的废弃煤矿内部，在机械乌鸦啼叫、矿井架坠落与瓦斯爆炸真火冲击波之间完成两段 90° 垂直链条提升）",
          "<strong>Daredevil Falls (敢死队瀑布)</strong>（<code>5.1.1.2</code> 穿越废弃伐木场暗黑隧道与机械黑熊场景的高速激流船）"
        ],
        col3: [
          "<strong>Dreamsong Theater / Heartsong Theater</strong>（多感官自然与音乐主题特效剧场）"
        ]
      },
      {
        col1: "<strong>美国犹他州泻湖乐园<br>3. Lagoon Amusement Park</strong>",
        col2: [
          "<strong>Primordial (原始森林，2023)</strong>（<code>1.1.4.2 + 1.1.1.3</code> <strong>ART Engineering + Triotech 巨型假山室内互动 3D 射击过山车</strong>：历时八年耗资逾 5000 万美元建成，旋转车厢在巨型机械猫头鹰、恶龙雕像与多块 3D 巨幕间驻停射击，尾声通过分叉道岔随机切入<strong>“垂直自由落体跌落轨 Drop Track”或“倾斜侧滑轨 Slide Track”双结局</strong>）",
          "<strong>Dracula's Castle (德古拉城堡，1974)</strong> & <strong>Terroride (恐怖之旅，1967)</strong>（<code>1.1.1.1</code> 保存完好的美式经典有轨鬼屋，后者由 Knoebels 团队与 Sally 翻新）"
        ],
        col3: [
          "<strong>Pioneer Village 历史街区与暗黑惊悚馆（Frightmares）</strong>"
        ]
      },
      {
        col1: "<strong>美国诺贝尔斯乐园 / 肯尼伍德 / 圣克鲁兹海滩等传奇独立乐园<br>4. Knoebels, Kennywood, Santa Cruz Beach Boardwalk & Waldameer</strong>",
        col2: [
          "<strong>Knoebels《Haunted Mansion (幽灵庄园，1973)》</strong>（<code>1.1.1.1</code> <strong>Pretzel / Knoebels 打造，连续十余年蝉联全美最佳传统鬼屋列车</strong>：双层宅邸内密集排布气动贴脸机关、紫外线黑光骷髅与迎面卡车喇叭惊吓）",
          "<strong>Knoebels《Black Diamond (黑钻矿山车，2011)》</strong>（<code>1.1.4.3</code> 迁移自新泽西 1960 年 Golden Nugget 的三层室内暗黑矿井叙事滑车）",
          "<strong>Kennywood《Old Mill (老磨坊，1901)》</strong>（<code>5.1.1.1</code> <strong>北美现存最古老的百年室内暗黑水道船</strong>，自 1901 年起持续运营至今） & <strong>《Ghostwood Estate》</strong>（<code>2.1 + 1.1.1.3</code> ETF 无轨激光捉鬼车） & <strong>《Exterminator》</strong>（<code>1.1.4.3</code> 室内下水道暗黑自旋过山车）",
          "<strong>Santa Cruz《Cave Train (地下穴居人小火车，1961)》</strong> & <strong>《Haunted Castle (2010 Sally 翻新)》</strong>（<code>1.1.1.1</code>） · <strong>Waldameer《Whacky Shack (1970，Bill Tracy 双层邪典有轨鬼屋)》</strong>"
        ],
        col3: [
          "<strong>Kennywood《Noah's Ark (诺亚方舟，1936)》</strong>（<code>T6.6</code> <strong>全球仅存的传统步入式摇摆方舟 Funhouse</strong>：整艘全尺寸巨型木制方舟搁浅在山顶并持续左右摇晃，游客从鲸鱼张开的大嘴步入摇晃的舱室与机关通道）"
        ]
      }
    ]
  }
};
