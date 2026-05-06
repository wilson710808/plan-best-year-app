export default {
  app: { title: '📅 规划最好的一年', subtitle: 'AI 引导，让梦想照进现实' },
  nav: { home: '首页', goals: '目标', checkIn: '打卡', ai: 'AI', settings: '我的' },
  welcome: {
    title: '规划最好的一年',
    subtitle: '基于《规划最好的一年》五大步骤，AI 引导你实现目标',
    start: '开始规划',
    features: ['🧭 五步骤引导规划', '🎯 SMARTER 目标设定', '🤖 AI 教练陪伴', '📊 数据追踪分析']
  },
  steps: {
    believe: { title: '相信可能', desc: '突破自我设限信念' },
    past: { title: '总结过去', desc: '从经验中学习' },
    why: { title: '找到为什么', desc: '发现内在驱动力' },
    smarter: { title: 'SMARTER 目标', desc: '设定具体可行目标' },
    execute: { title: '执行力', desc: '持续行动与追踪' }
  },
  dashboard: {
    greeting: '你好', activeGoals: '活跃目标', streak: '连续打卡', completion: '完成率',
    quickActions: '快捷操作', todayTasks: '今日任务', beliefReminder: '今日信念提醒',
    milestones: '里程碑', heatMap: '打卡热力图', energyCurve: '能量曲线',
    calibration: '季度校正', focusMode: '专注模式'
  },
  goals: {
    add: '新增目标', limit: '建议同时追踪不超过 5 个目标', limitWarning: '目标数量超过建议上限',
    categories: { career: '事业', health: '健康', finance: '财务', relationship: '关系', growth: '成长', contribution: '贡献' },
    smarter: { specific: '具体的', measurable: '可衡量的', achievable: '可达成的', risky: '有挑战的', timeBound: '有时限的', exciting: '令人兴奋的', relevant: '相关的' },
    why1: '为什么这个目标对你重要？', why2: '为什么那个原因对你重要？', why3: '最深层的渴望是什么？',
    leadingIndicators: '领先指标（可控制行为）', laggingIndicators: '滞后指标（结果衡量）',
    milestones: '里程碑', addMilestone: '新增里程碑',
    abandonList: '待弃清单', pastReview: '总结过去', smarterScore: 'SMARTER 评分',
    periodCalibration: '季度校正', milestoneWall: '里程碑墙'
  },
  checkIn: {
    title: '每日打卡', completed: '已完成', missed: '未完成', makeUp: '补卡',
    makeUpReason: '请说明补卡原因和反思', batchComplete: '一键全部打卡', focusMode: '专注模式',
    celebration: '🎉 太棒了！连续打卡', days: '天！',
    streak7: '坚持一周了！继续保持 💪', streak14: '两周达成！你是最棒的 🌟', streak21: '21天习惯养成！🎉🎊🥳'
  },
  belief: {
    title: '信念追踪',
    categories: { selfLimiting: '自我设限', overGeneralization: '过度概括', pessimisticFilter: '悲观过滤', emotionalReasoning: '情绪推理', perfectionism: '完美主义', comparison: '比较心理' },
    limiting: '限制性信念', reframed: '转化后信念', addNew: '记录新信念', transform: '转化信念'
  },
  ai: {
    coach: 'AI 教练', partners: 'AI 伙伴圈', challenge: '挑战计划',
    styles: {
      motivator: { name: '激励型', desc: '充满能量，推你前进', emoji: '🔥' },
      analyst: { name: '分析型', desc: '理性数据，精准策略', emoji: '📊' },
      companion: { name: '陪伴型', desc: '温暖倾听，情感支持', emoji: '🤗' },
      challenger: { name: '挑战型', desc: '直接犀利，突破舒适圈', emoji: '⚡' }
    },
    partnerRoles: {
      traveler: { name: '同行者', desc: '和你一起成长' },
      veteran: { name: '过来人', desc: '已经走过这条路' },
      newbie: { name: '新手', desc: '刚开始的新朋友' },
      coach: { name: '教练', desc: '专业引导' }
    },
    sevenDay: '7天启动计划', twentyOneDay: '21天挑战',
    inputPlaceholder: '输入你的问题...', send: '发送',
    buddyMissed: '今天 {name} 忘记打卡了 😅 他说明天会补上！'
  },
  review: {
    weekly: '周回顾', monthly: '月回顾',
    achievements: '本周成就', improvements: '待改进', nextFocus: '下周重点',
    mood: '今日心情', completed: '完成了什么', obstacle: '遇到什么阻碍', tomorrow: '明天计划'
  },
  settings: {
    title: '设置', language: '语言', theme: '主题', darkMode: '深色模式',
    coachStyle: '教练风格', about: '关于',
    aboutContent: '本应用基于《规划最好的一年》五步骤法则，帮助你系统性地规划和实现年度目标。',
    corePrinciples: '五步核心理念', data: '数据管理', clearData: '清除所有数据',
    clearConfirm: '确定要清除所有数据吗？此操作不可撤销。',
    unlockInfo: '功能解锁进度', dayLabel: '第 {n} 天'
  },
  unlock: {
    day1: '基础功能已解锁', day3: '目标追踪已解锁', day7: 'AI 教练已解锁',
    day14: '进阶分析已解锁', locked: '将在第 {n} 天解锁'
  },
  common: {
    save: '保存', cancel: '取消', delete: '删除', edit: '编辑', confirm: '确认',
    back: '返回', next: '下一步', previous: '上一步', done: '完成',
    loading: '加载中...', noData: '暂无数据', error: '发生错误'
  }
}
