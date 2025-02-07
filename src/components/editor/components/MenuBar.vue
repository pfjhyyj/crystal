<template>
  <div class="menu-bar">
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type == 'divider'" :key="`divider-${index}`"></div>
      <MenuItem
        v-else
        :key="item.title"
        :icon="item.icon ?? ''"
        :title="item.title"
        :action="item.action ?? (() => {})"
        :is-active="item.isActive"
        :disabled="item.disabled"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import MenuItem from './MenuItem.vue';

interface MenuItem {
  type?: string;
  icon?: string;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
}

const props = defineProps<{
  editor: Editor | undefined;
}>()

const items: MenuItem[] = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor?.chain().focus().toggleBold().run(),
    isActive: () => props.editor?.isActive('bold') || false,
    disabled: () => props.editor?.can().chain().focus().toggleBold().run() || false,
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor?.chain().focus().toggleItalic().run(),
    isActive: () => props.editor?.isActive('italic') || false,
    disabled: () => props.editor?.can().chain().focus().toggleItalic().run() || false,
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor?.chain().focus().toggleStrike().run(),
    isActive: () => props.editor?.isActive('strike') || false,
    disabled: () => props.editor?.can().chain().focus().toggleStrike().run() || false,
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => props.editor?.chain().focus().toggleCode().run(),
    isActive: () => props.editor?.isActive('code') || false,
    disabled: () => props.editor?.can().chain().focus().toggleCode().run() || false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 1 }) || false,
    disabled: () => props.editor?.can().chain().focus().toggleHeading({ level: 1 }).run() || false,
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 2 }) || false,
    disabled: () => props.editor?.can().chain().focus().toggleHeading({ level: 2 }).run() || false,
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor?.chain().focus().setParagraph().run(),
    isActive: () => props.editor?.isActive('paragraph') || false,
    disabled: () => props.editor?.can().chain().focus().setParagraph().run() || false,
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor?.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor?.isActive('bulletList') || false,
    disabled: () => props.editor?.can().chain().focus().toggleBulletList().run() || false,
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor?.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor?.isActive('orderedList') || false,
    disabled: () => props.editor?.can().chain().focus().toggleOrderedList().run() || false,
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => props.editor?.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor?.isActive('codeBlock') || false,
    disabled: () => props.editor?.can().chain().focus().toggleCodeBlock().run() || false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor?.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor?.isActive('blockquote') || false,
    disabled: () => props.editor?.can().chain().focus().toggleBlockquote().run() || false,
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor?.chain().focus().setHorizontalRule().run(),
    disabled: () => props.editor?.can().chain().focus().setHorizontalRule().run() || false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => props.editor?.chain().focus().setHardBreak().run(),
    disabled: () => props.editor?.can().chain().focus().setHardBreak().run() || false,
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor?.chain().focus().clearNodes().unsetAllMarks().run(),
    disabled: () => props.editor?.can().chain().focus().clearNodes().unsetAllMarks().run() || false,
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => props.editor?.chain().focus().undo().run(),
    disabled: () => props.editor?.can().chain().focus().undo().run() || false,
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => props.editor?.chain().focus().redo().run(),
    disabled: () => props.editor?.can().chain().focus().redo().run() || false,
  },
]
</script>

<style lang="scss" scoped>
.menu-bar {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #ddd;
  padding: 4px;
}
.divider {
  width: 1px;
  background-color: #ddd;
  margin: 4px 0;
}
</style>