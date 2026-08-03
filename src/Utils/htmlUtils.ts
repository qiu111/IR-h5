/**
 * HTML 实体解码工具函数
 * @param html 需要解码的 HTML 字符串（自动处理 null/undefined）
 * @returns 解码后的纯文本字符串
 * 
 * 注意事项：
 * 1. 仅在浏览器环境使用（依赖 DOM API）
 * 2. 自动过滤 script 标签内容（安全防护）
 * 3. 处理特殊字符编码（如 &amp; &lt; &gt; 等）
 */
export function decodeHtmlEntities(html: string | null | undefined): string {
    // 处理空值情况
    if (!html) return '';
  
    // 安全防护：创建临时容器并移除潜在危险标签
    const container = document.createElement('div');
    const safeHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
    // 使用 textarea 解码策略（兼容性最佳）
    const textarea = document.createElement('textarea');
    textarea.innerHTML = safeHtml;
    
    // 双重保险：使用 textContent 作为 fallback
    return textarea.value || container.textContent || '';
  }