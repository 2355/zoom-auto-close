chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // ページの読み込みが完了したときのみ処理
  if (changeInfo.status === 'complete' && tab.url) {
    
    // Zoomの成功ページURLパターンをチェック
    const shouldClose = 
      tab.url.includes('#success');
    
    if (shouldClose) {
      console.log('Zoom success page detected:', tab.url);
      // 1秒後にタブを閉じる（Zoomアプリ起動の時間を確保）
      setTimeout(() => {
        chrome.tabs.remove(tabId, () => {
          if (chrome.runtime.lastError) {
            console.error('Error closing tab:', chrome.runtime.lastError);
          } else {
            console.log('Tab closed successfully');
          }
        });
      }, 1000);
    }
  }
});

