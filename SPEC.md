# IELTS Tools · Product Specification

> 这份文档是给 Claude Code 的完整上下文。任何时候不确定方向，回来看这里。

## 1. 产品定位

**这不是又一个雅思 App。** 市面上题库、单词书、模考应用非常多，但**没有一个把散落在几十个来源（剑桥、Simon、慎小嶷、b 站、公众号）里的技巧做系统整合**的工具。

**这个工具做且只做的事**：
- 把雅思技巧按题型集中整合，每个技巧一节课
- 讲完立刻挂练习，练习时给"洞察式反馈"（不是对错，是"你抓住/漏掉了什么"）
- 全部内容进艾宾浩斯 SRS 循环
- 错题按类型归因，一周后给用户看"你的错题分布图"
- 用户可以导入自己在剑桥真题里错的题，进入同一个循环

**明确不做**：
- 单词书（市面已饱和）
- 完整题库（剑桥真题更权威，用户自己做）
- 听力音频（版权 + 剑桥已经提供）
- 默写功能（多余）

## 2. 目标用户

**Erya**（本项目的唯一用户，需求完全按 Erya 定制）：

- 中国研究生，AECNet 论文提交 TGRS 后，全天投入准备雅思 2 个月
- 起点自评 5.0（未系统测试；有 CET-6 底，能读英文论文，实际可能 6 附近）
- 目标：**overall 7.5，各项小分 7+**
- 弱点排序：听力 > 口语 > 写作 > 阅读
- 学习特征：**新东西上手快、但学了容易忘**；传统"学完打卡"无效，需要**过程中的即时反馈**
- 强偏好：**技巧驱动**，不愿循规蹈矩背单词/刷题库

## 3. 已锁定的决策

### 3.1 内容策略
- **AI 原创练习**：模仿剑桥出题风格，作日常刷题主力（无版权风险 + 题量无限）
- **用户导入**：Erya 做剑桥真题时错的题，手动粘贴进网站，进入错题库
- **每周错题回放**：每周日自动打包本周所有错题成个人化测验

### 3.2 界面语言
- 技巧讲解、题目、UI 按钮：**全英文**（熟悉雅思术语）
- 陷阱洞察（答完题的反馈解释）：**默认英文，一键切中文**
- 划词翻译弹窗：**英英释义 + 3 个同义词 + 中文兜底 + 加入生词本**
- 生词本：Erya 遇到的所有生词进艾宾浩斯循环

### 3.3 错题归因标签系统

**阅读（8 类）**：
1. Missed absolute qualifier（漏看 all / only / always / must）
2. Missed synonym / paraphrase（同义替换未识别）
3. Timeline / tense confusion（时态时间线错）
4. Reversed causality（因果颠倒）
5. Missed numerical / comparative detail（数字/比较级细节漏）
6. Confused main idea with detail（主旨细节混淆）
7. Confused author view with cited view（作者观点 vs 他人观点）
8. Ran out of time / guessed（时间不够蒙的）

**听力（6 类）**：
1. Wrong part-of-speech prediction（词性预判错）
2. Missed singular / plural（单复数）
3. Number / letter / date trap（数字字母日期陷阱）
4. Missed paraphrase in audio（同义替换没跟上）
5. Fell for distractor（干扰选项误导）
6. Zoned out / lost pace（走神/跟不上语速）

每题答错后必勾一个原因。一周后 Progress 页显示归因分布饼图。

### 3.4 SRS
- 6 级间隔：1 / 2 / 4 / 8 / 16 / 32 天
- 每次评价：忘了（重置到 L0）/ 勉强（保持当前级）/ 记得（升一级）
- 技巧熟练度槽：每个技巧要连续答对 N 题（先设 N=3）才算"掌握"，之后进 SRS

### 3.5 已批准的进阶功能
- ✓ **每周错题回放**（周日自动生成本周错题测验）
- ✓ **盲听训练**（预判题型下先隐藏选项）
- ✓ **计时渐进**（新技巧不计时 → 1.5x → 真实考试时间）
- ✓ **技巧熟练度槽**（N 题连对才算掌握）
- ✗ 反向阅读（太难，砍掉）

## 4. 模块优先级（构建顺序）

### 阶段 1 · Foundation（Session 1 目标）
1. **文件拆分**：从单文件 refactor 到模块化架构（见 §5）
2. **英文界面切换**：技巧讲解、题目、UI 全英文
3. **中英切换按钮**：仅对"陷阱洞察"部分生效
4. **错题归因标签**：答错后弹标签选择器；数据存进 localStorage
5. **保留现有 2 个阅读技巧**作为种子内容

### 阶段 2 · Core Learning Loop
6. **划词翻译**：鼠标悬停/点击任何英文词 → 弹卡片（英英释义 + 同义词 + 中文 + 加入生词本按钮）
7. **生词本模块**：进 SRS 循环，独立复习入口
8. **听力模块 3a**：答案词性预判训练
9. **听力模块 3b**：同义替换预判训练
10. **听力模块 3d**：数字字母日期陷阱识别

### 阶段 3 · Advanced
11. **用户导入模块**：粘贴剑桥真题的错题，自动加入错题库
12. **每周错题回放**：周日自动生成个人化测验
13. **技巧熟练度槽**：3 连对才升级
14. **计时渐进**：三档速度模式
15. **归因分布图**：Progress 页展示饼图

### 阶段 4 · Later
16. **写作批改**：诊断型分析 + 7.5 版重写对比（Erya 明确要求"听力阅读上正轨后再做"）
17. **听力模块 3c**（信号词）、**3e**（说话人立场）
18. **口语模块**：等 Erya 调研完市面产品后再定

## 5. 目标架构

```
ielts-tools/
├── index.html              # 主壳（只保留骨架 + script 引用）
├── styles.css              # 所有样式
├── app.js                  # 入口 · 路由 · 状态管理
├── content/
│   ├── reading.js          # 阅读技巧+练习数据
│   ├── listening.js        # 听力技巧+练习数据
│   └── seed-vocab.js       # 可选：种子生词（如果需要）
├── modules/
│   ├── srs.js              # 艾宾浩斯算法
│   ├── stats.js            # 错题归因统计
│   ├── glossary.js         # 划词翻译 + 生词本
│   ├── i18n.js             # 中英切换
│   └── mastery.js          # 技巧熟练度槽
├── SPEC.md                 # 本文档
└── README.md
```

**加内容原则**：改 `content/*.js` 一个文件，不动其他。这是"内容和代码分离"的核心。

## 6. 数据 Schema（localStorage）

```javascript
{
  // 用户元数据
  meta: {
    createdAt: "2026-07-14",
    lastActive: "2026-07-14",
    streak: 0,
    xp: 0,
    langPref: "en"  // "en" | "zh" —— 对 insight 生效
  },
  
  // SRS 项（题目 + 生词 统一 schema）
  items: {
    "q:reading-tfng:0": {
      type: "question",       // "question" | "vocab"
      level: 0,               // 0-5
      nextDue: "2026-07-15",
      lastSeen: "2026-07-14",
      correctStreak: 0,       // 连对次数，用于熟练度槽
      history: [              // 每次答题记录
        { date, correct, errorTag }
      ]
    },
    "v:mitigate": {
      type: "vocab",
      addedFrom: "reading",    // 从哪个模块收进来
      level: 0,
      nextDue: "...",
      lastSeen: "..."
    }
  },
  
  // 技巧掌握状态
  lessonMastery: {
    "reading-tfng": {
      completed: true,
      masteryScore: 0.72,     // 该技巧下所有题目 SRS 平均等级
      lastPracticed: "2026-07-14"
    }
  },
  
  // 每日历史
  history: {
    "2026-07-14": {
      xpGained: 120,
      itemsDone: 12,
      correctRate: 0.83,
      errorTags: { "missed_synonym": 2, "wrong_pos": 1 }
    }
  },
  
  // 生词本
  glossary: [
    { word: "prevalent", def: "...", zh: "...", addedAt: "...", context: "..." }
  ],
  
  // 用户导入的错题
  imported: [
    { source: "Cam 15 Test 2 Reading Passage 1 Q7",
      context: "...", prompt: "...", options: [...], answer: 1,
      note: "...", addedAt: "..." }
  ]
}
```

## 7. UI 设计原则

- 深色背景 (#0e1013)，单一强调色（蓝紫 #7c9cff）
- 生成慎重、非儿童化——Erya 是研究生，要成人感
- 每次正确答题：**+XP 悬浮动画 + 洞察卡片滑入**
- 陷阱洞察必须包含"你抓住/漏掉了什么"这类**认知层面的反馈**，而非"对/错"
- 移动端可用（Erya 可能在通勤时用手机复习）

## 8. 划词翻译的技术方案

用户点击任何英文词 → 查询 → 弹卡片。三种实现选项，Session 1 讨论后选定：

- **A. 内置字典 JSON**：把常用 7000 词的定义/同义词/中文打包进项目。优点：离线、快。缺点：文件大（约 2-5 MB），词汇有限。
- **B. Free Dictionary API**（api.dictionaryapi.dev）：免费、无 key。优点：覆盖全。缺点：需网络，无中文，无预置同义词。
- **C. A + B 混合**：内置 3000 高频词（带中文），未命中调 API。**推荐**。

## 9. 部署

- **平台**：GitHub Pages
- **仓库**：`vincydream/ielts-tools`（Public）
- **URL**：`vincydream.github.io/ielts-tools`
- **发布**：push 到 main 分支自动生效
- **数据持久化**：全部 localStorage，绑定域名，不受代码更新影响

## 10. 尚未定的问题（Session 1 结束前和 Erya 确认）

- **每日 8 小时的时间分配**方案（Erya 未回答）
- **真题测试后**是否需要调整模块权重（等 Erya 本周做完真题后确认）
- **划词翻译**选 A/B/C 哪种
- **技巧熟练度槽的 N 值**：默认 3，Erya 用几天后看要不要调
- **口语模块方向**：等 Erya 调研市面产品后定

## 11. Session 1 具体建议

给 Claude Code 的第一句话可以是：

> 读一下 SPEC.md 和现有的 index.html。这是我们已经做出的 v1。现在按 §4 的阶段 1（Foundation）做重构：拆分文件、切英文界面、加中英切换、加错题归因标签。种子内容保留现有的两个阅读技巧（TFNG 和 Matching Headings），完整翻译成英文。生词模块暂时移除——之后会用划词翻译+生词本的方式重新做。

Session 1 完成的验收标准：
- [ ] 文件拆分成上述架构
- [ ] 全英文 UI（技巧、题目、按钮）
- [ ] 洞察部分有中英切换按钮
- [ ] 答错后弹归因标签选择器
- [ ] Progress 页能看到本周错题的归因分布
- [ ] 现有 SRS 逻辑保留，数据结构升级到 §6 的 schema
- [ ] 本地打开能用、push GitHub Pages 后线上能用
