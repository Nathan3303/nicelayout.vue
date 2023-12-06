<template>
    <Title class="nl-editable-title" :size="size">
        <template v-slot:title>
            <NlInput
                v-if="isEditingTitle"
                class="editor"
                ref="titleEditor"
                v-model="title"
                @blured="onTitleEditorBlur(false, false)" />
            <span v-else @dblclick.stop="goEditTitle">{{ title }}</span>
            <NlButton
                v-show="!isEditingTitle"
                class="edit-button"
                icon="icon-chuangzuo"
                theme="text"
                shape="square"
                title="Edit title"
                @click="goEditTitle" />
        </template>
        <template v-slot:subTitle>
            <NlInput
                v-if="isEditingSubTitle"
                class="editor"
                ref="subTitleEditor"
                v-model="subTitle"
                @blured="onSubTitleEditorBlur(false, false)" />
            <span v-else @dblclick.stop="goEditSubTitle">{{ subTitle }}</span>
            <NlButton
                v-show="!isEditingSubTitle"
                class="edit-button"
                icon="icon-chuangzuo"
                theme="text"
                shape="no-shape"
                title="Edit sub-title"
                @click.stop="goEditSubTitle" />
        </template>
    </Title>
</template>

<script setup>
import { ref, computed } from "vue";
import { useEditController } from "@nice-layout/hooks/use-edit-controller";
import Title from "./title.vue";
import "../style/editable-title.css";

defineOptions({ name: "NlEditableTitle" });
const props = defineProps({
    title: String,
    subTitle: String,
    size: String,
});
const emit = defineEmits(["titleChange", "subTitleChange"]);

const titleEditor = ref();
const subTitleEditor = ref();

const _titleEditor = computed(() => titleEditor.value?.inputRef);
const _subTitleEditor = computed(() => subTitleEditor.value?.inputRef);

const {
    isEditing: isEditingTitle,
    vModel: title,
    goEdit: goEditTitle,
    onEditorBlur: onTitleEditorBlur,
} = useEditController(false, {
    vmInitialValue: props.title,
    vmValidator: (v) => v,
    vmHandler: (v) => emit("titleChange", v),
    editorRef: _titleEditor,
});

const {
    isEditing: isEditingSubTitle,
    vModel: subTitle,
    goEdit: goEditSubTitle,
    onEditorBlur: onSubTitleEditorBlur,
} = useEditController(false, {
    vmInitialValue: props.subTitle,
    vmValidator: (v) => v,
    vmHandler: (v) => emit("subTitleChange", v),
    editorRef: _subTitleEditor,
});
</script>
