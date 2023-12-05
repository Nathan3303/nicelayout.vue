<template>
    <nl-div class="test-nl-title" vertical :gap="24">
        <nl-div vertical>
            <p>1. 通过 props.title 和 props.subTitle 指定显示内容</p>
            <nl-title title="Title text" sub-title="Sub-title text" />
        </nl-div>
        <nl-div vertical>
            <p>2. 通过设置 props.size 改变 title 和 subTitle 的显示大小</p>
            <nl-title sub-title="sub-title" title="size=tiny" size="tiny" />
            <nl-title sub-title="sub-title" title="size=small" size="small" />
            <nl-title
                sub-title="sub-title"
                title="size=normal(default)"
                size="normal" />
            <nl-title sub-title="sub-title" title="size=medium" size="medium" />
            <nl-title sub-title="sub-title" title="size=large" size="large" />
            <nl-title sub-title="sub-title" title="size=huge" size="huge" />
        </nl-div>
        <nl-div vertical>
            <p>
                3. 通过设置 props.keepSubtitleSize 以保持 subTitle
                的显示大小，值类型可以为 Boolean 和 Number(size)
            </p>
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=tiny"
                size="tiny" />
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=small"
                size="small" />
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=normal(default)"
                size="normal" />
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=medium"
                size="medium" />
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=large"
                size="large" />
            <nl-title
                :keep-subtitle-size="16"
                sub-title="sub-title"
                title="size=huge"
                size="huge" />
        </nl-div>
        <nl-div vertical>
            <p>
                4. 通过 NlEditableTitleBar 组件完成对 title 或 subTitle 的编辑
            </p>
            <nl-editable-title
                title="Title text"
                sub-title="Sub-title text"
                @titleChange="(v) => console.log(v)"
                @subTitleChange="(v) => console.log(v)" />
            <nl-editable-title
                title="Title text"
                sub-title="Sub-title text"
                size="huge"
                @titleChange="(v) => console.log(v)"
                @subTitleChange="(v) => console.log(v)" />
        </nl-div>
    </nl-div>
</template>

<script setup>
defineOptions({ name: "NlTitleTester" });
</script>
