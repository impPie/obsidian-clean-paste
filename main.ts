import { Plugin, Editor } from 'obsidian';

export default class CleanPastePlugin extends Plugin {
    async onload() {
        console.log('Loading SuperClean Paste Plugin');

        // 移除了之前监听全局粘贴事件的 `this.app.workspace.on('editor-paste', ...)` 代码。

        // 使用 this.addCommand 来注册一个新命令
        this.addCommand({
            id: 'superclean-paste', 
            name: 'SuperClean Paste', 

            // 设置默认快捷键。'Mod' 会自动映射为 Ctrl (Windows/Linux) 或 Cmd (macOS)
            // 用户可以在 Obsidian 的快捷键设置中随时修改它。
            hotkeys: [
                {
                    modifiers: ['Mod', 'Shift'],
                    key: 'V',
                },
            ],

            //  editorCallback 命令只在用户处于编辑模式时才会生效
            // 从剪贴板读取内容是异步操作
            editorCallback: async (editor: Editor) => {

                // 使用 navigator.clipboard.readText() 从系统剪贴板异步读取纯文本
                const clipboardText = await navigator.clipboard.readText();

                // 如果剪贴板没有文本，则不执行任何操作
                if (!clipboardText) {
                    return;
                }

                // --- 核心清理逻辑保持不变 ---
                // 将2个或更多的连续换行符(\n)替换为单个换行符
                const cleanedText = clipboardText.replace(/\n{2,}/g, '\n');

                // 在当前光标位置插入我们清理过的文本
                editor.replaceSelection(cleanedText);
            },
        });
    }

    onunload() {
        console.log('Unloading SuperClean Paste Plugin');
    }
}