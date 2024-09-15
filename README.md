# 简介

受平台所托，完成了社团招新平台的前端部分。组件与部分实现参考 rx 的 [moectf平台](https://ctf.xidian.edu.cn), 但是代码一行都没有复制，我认为可视为原创，故开源。

技术栈:
    - 框架: svelteKit
    - 语言: typescript, scss, svelte
    - 样式: tailwindcss
    - 组件库: daisyui

以下为 sveltekit 原文: 

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
