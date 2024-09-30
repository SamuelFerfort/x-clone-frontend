export function truncatePostContent(content, maxLength = 150) {
   
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  }