import { Plugin, Editor } from 'obsidian';

export default class CleanPastePlugin extends Plugin {
    async onload() {
        console.log('Loading Clean Paste Plugin');

        // 注册粘贴事件监听器
        this.registerEvent(
            this.app.workspace.on('editor-paste', (evt: ClipboardEvent, editor: Editor) => {
                
                // 从剪贴板获取纯文本
                const clipboardText = evt.clipboardData?.getData('text/plain');

                if (!clipboardText) {
                    return; // 如果不是文本，则不处理
                }

                // 核心逻辑：替换连续的多个换行符为单个换行符
                const cleanedText = clipboardText.replace(/\n{2,}/g, '\n');

                // 阻止默认粘贴行为
                evt.preventDefault();

                // 将处理后的干净文本插入编辑器
                editor.replaceSelection(cleanedText);
            })
        );
    }

    onunload() {
        console.log('Unloading Clean Paste Plugin');
    }
}