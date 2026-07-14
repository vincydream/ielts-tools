# IELTS Sprint · 雅思冲刺

> A single-file, technique-first IELTS learning app with SRS review, immediate in-lesson feedback, and localStorage persistence. Built to solve one specific problem: **the dopamine gap between studying and being rewarded**.

一个单文件、技巧优先的雅思学习工具。核心不是"打卡"，而是让每一次答题的瞬间都有反馈——因为传统的"学完再奖励自己"这套对某些人（比如作者）没用。

![no dependencies](https://img.shields.io/badge/dependencies-0-brightgreen) ![single file](https://img.shields.io/badge/deploy-single%20HTML-blue) ![storage](https://img.shields.io/badge/persistence-localStorage-yellow)

## 为什么做这个

作者目标是 2 个月内雅思 7.5，各项小分 7+。已有的学习类 App 主要问题：

- **反馈延迟太长**：学一整天，"奖励自己"发生在合上书之后。等到那个时候，动力早就散了。
- **循规蹈矩**：单词书从 A 到 Z、听力从 Section 1 到 Section 4。但雅思的核心是**题型技巧**，不是词汇量堆砌。
- **没有强制复习节奏**：知道 SRS 好用，但市面上大部分工具要么太重（Anki），要么绑得太死（付费应用）。

这个工具的三个设计决策：

1. **技巧优先**。每节课是一个**题型打法**（比如 TFNG 判断三分法、Matching Headings 主题句定位），后面挂练习。你学的是"框架 + 陷阱"，不是知识点。
2. **即时反馈层**。每道题回答后立即出现「洞察卡片」，不是"对/错"，而是**"你抓住了 X，这是 Y 类题目的经典陷阱源"**——把"啊我懂了"这个瞬间本身做成奖励。
3. **SM-2 简化 SRS**。每项内容有 6 级间隔（1/2/4/8/16/32 天）。评价一次，系统决定下次什么时候再见。复习任务是"推送式"的，不需要你规划。

## 使用

```bash
# 方式 1：本地打开
open index.html   # macOS
# 或直接双击 index.html

# 方式 2：GitHub Pages
# push 到 GitHub → Settings → Pages → 选 main 分支 → 完成
```

无依赖，无构建，纯 HTML/CSS/JS。数据存在浏览器 `localStorage` 里。

## 已有内容（MVP）

- **阅读技巧**：True/False/Not Given 判断三分法 · Matching Headings 主题句定位
- **词汇**：15 个 7.0+ 高频词，每个配中文场景锚点（不是背单词，是建联想）
- **完整的 SRS 复习循环**
- **Streak、XP、掌握度可视化**

## 加内容

打开 `index.html`，找到 `const CONTENT = { ... }`。结构一目了然：

```javascript
lessons: [
  {
    id: 'reading-tfng',           // 唯一 ID
    section: '阅读',
    title: '题型名称',
    subtitle: '一句话核心',
    body: `<HTML 格式的讲解>`,
    questions: [
      {
        context: '<原文片段，可用 <span class="highlight"> 高亮>',
        prompt: '题目',
        options: ['A', 'B', 'C'],
        answer: 1,                 // 正确答案 index
        insight: '💡 洞察 — 为什么这题这么选，陷阱在哪'
      }
    ]
  }
],
vocab: [
  {
    word: 'mitigate',
    pos: 'v.',
    def: '中文释义',
    scene: '<场景锚点，可含 <strong> 强调>',
    ex: 'English example sentence.'
  }
]
```

加课就是往 `lessons` 数组里加对象。加词就是往 `vocab` 数组里加对象。ID 保持唯一即可，其余是数据。

## 路线图

想接下来加的东西（按优先级）：

- [ ] Writing Task 2 论证结构模板（Concession-Refutation / Cause-Effect）+ 句式识别练习
- [ ] Speaking Part 2 cue card 框架（STAR 变体）+ Part 3 观点结构
- [ ] Listening 关键词预判训练（听前先看题目预测答案词性）
- [ ] 数据导入/导出（备份 localStorage 到 JSON）
- [ ] 离线 PWA
- [ ] 内容按 CEFR 分级过滤

## 技术栈

Vanilla HTML/CSS/JS · localStorage · 单文件 · 无依赖 · 无构建工具。

之所以选择"零框架"：这个工具的价值在于**内容和交互设计**，不在工程。零依赖意味着 5 年后还能打开，改起来门槛也低。

