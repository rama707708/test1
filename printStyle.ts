// Get all stylesheets
  const styles = [...document.styleSheets]
    .map(styleSheet => {
      try {
        if (styleSheet.href) {
          return `<link rel="stylesheet" href="${styleSheet.href}">`;
        }
        const rules = [...styleSheet.cssRules].map(rule => rule.cssText).join('');
        return `<style>${rules}</style>`;
      } catch (e) {
        return '';
      }
    }).join('');
