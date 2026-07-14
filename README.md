# IELTS Sprint

> A technique-first IELTS learning app with SRS review, immediate in-lesson feedback, error attribution tagging, and localStorage persistence. Built to solve one specific problem: **the dopamine gap between studying and being rewarded**.

一个技巧优先的雅思学习工具。核心不是"打卡"，而是让每一次答题的瞬间都有反馈——因为传统的"学完再奖励自己"这套对某些人（比如作者）没用。全英文界面，陷阱洞察支持中英切换。

![no dependencies](https://img.shields.io/badge/dependencies-0-brightgreen) ![no build](https://img.shields.io/badge/build-none-blue) ![storage](https://img.shields.io/badge/persistence-localStorage-yellow)
##
在线网址： https://vincydream.github.io/ielts-tools/

## 为什么做这个

作者目标是 2 个月内雅思 7.5，各项小分 7+。已有的学习类 App 主要问题：

- **反馈延迟太长**：学一整天，"奖励自己"发生在合上书之后。等到那个时候，动力早就散了。
- **循规蹈矩**：单词书从 A 到 Z、听力从 Section 1 到 Section 4。但雅思的核心是**题型技巧**，不是词汇量堆砌。
- **没有强制复习节奏**：知道 SRS 好用，但市面上大部分工具要么太重（Anki），要么绑得太死（付费应用）。

这个工具的四个设计决策：

1. **技巧优先**。每节课是一个**题型打法**（比如 TFNG 判断三分法、Matching Headings 主题句定位），后面挂练习。你学的是"框架 + 陷阱"，不是知识点。
2. **即时反馈层**。每道题回答后立即出现「洞察卡片」，不是"对/错"，而是**"你抓住了 X，这是 Y 类题目的经典陷阱源"**——把"啊我懂了"这个瞬间本身做成奖励。洞察默认英文，一键切中文。
3. **SM-2 简化 SRS**。每项内容有 6 级间隔（1/2/4/8/16/32 天）。评价一次，系统决定下次什么时候再见。复习任务是"推送式"的，不需要你规划。
4. **错题归因**。答错弹出归因标签选择器（漏看绝对化词汇、时态混淆等），一周后 Progress 页看到自己的错题分布。

## 使用

```bash
# 方式 1：本地打开
open index.html   # macOS
# 或直接双击 index.html

# 方式 2：GitHub Pages
# push 到 GitHub → Settings → Pages → 选 main 分支 → 完成
```

无依赖，无构建，纯 HTML/CSS/ES Modules。数据存在浏览器 `localStorage` 里（key: `ielts-sprint-v2`）。

## 架构

```
ielts-tools/
├── index.html              # 主壳（骨架 + script 引用）
├── styles.css               # 所有样式
├── app.js                   # 入口 · 路由 · 状态管理
├── content/
│   ├── reading.js           # 阅读技巧 + 练习数据
│   └── listening.js         # 听力技巧 + 练习数据（Stage 2 填充）
├── modules/
│   ├── srs.js                # 艾宾浩斯 SRS 算法
│   ├── stats.js               # 错题归因标签 + 统计
│   ├── i18n.js                 # 洞察部分中英切换
│   └── mastery.js             # 技巧掌握度计算
├── SPEC.md                   # 完整产品规格（给 Claude Code 的上下文）
└── README.md
```

**加内容原则**：只改 `content/*.js`，不动其他文件。

## 已有内容（Stage 1 · Foundation）

- **阅读技巧**：True/False/Not Given 三分法 · Matching Headings 段落主旨定位（全英文，含中英切换洞察）
- **完整的 SRS 复习循环**（6 级间隔：1/2/4/8/16/32 天）
- **错题归因标签**：答错弹标签选择器，Progress 页看最近 7 天的错题分布
- **Streak、XP、掌握度可视化**
- 生词模块（划词翻译 + 生词本）已移除，Stage 2 重做

## 加内容

打开 `content/reading.js`（或新建 `content/listening.js` 里的技巧），往数组里加一个 lesson 对象：

```javascript
export const READING_LESSONS = [
  {
    id: 'reading-tfng',            // 唯一 ID
    section: 'Reading',
    title: 'Lesson title',
    subtitle: 'One-line summary',
    body: `<HTML formatted explanation>`,
    questions: [
      {
        context: '<passage snippet, use <span class="highlight"> to highlight>',
        prompt: 'Question text',
        options: ['A', 'B', 'C'],
        answer: 1,                  // correct answer index
        insight: {
          en: 'Why this is the answer — in English',
          zh: '为什么选这个 — 中文'
        }
      }
    ]
  }
];
```

ID 保持唯一即可，其余是数据。错题归因标签在 `modules/stats.js` 的 `ERROR_TAGS` 里维护。

## 路线图

按 SPEC.md §4 的阶段划分：

- [x] **Stage 1 · Foundation**：文件拆分、全英文界面、中英切换、错题归因标签
- [ ] **Stage 2 · Core Learning Loop**：划词翻译 + 生词本、听力模块 3a/3b/3d
- [ ] **Stage 3 · Advanced**：用户导入错题、每周错题回放、技巧熟练度槽、计时渐进、归因分布图
- [ ] **Stage 4 · Later**：写作批改、听力模块 3c/3e、口语模块

## 技术栈

Vanilla HTML/CSS/JS（ES Modules）· localStorage · 无依赖 · 无构建工具。

之所以选择"零框架"：这个工具的价值在于**内容和交互设计**，不在工程。零依赖意味着 5 年后还能打开，改起来门槛也低。

## License

MIT — 拿去随便改。
