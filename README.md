<p align='center'>
Phone validator web ui by Crystal Hon<br>
</p>

<br>

<p align='center'>
<a href="#">Live Demo</a>
</p>

## Features

### Coding Style

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Commit lint](https://github.com/conventional-changelog/commitlint)

## Usage

### Development

Type:

```bash
yarn dev
```

Then visit http://localhost:3000

### Build

To build like if it was for production run

```bash
yarn build
yarn start
```

Then you can visit http://localhost:3000 and check that everything works as expected.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your repository, `OK` along the way, and your App will be live in a minute.

## Issues

#### Dark mode

With CSS-Modules the "global" css-var `.dark` is not visible inside `.module.css` files, thus the Tailwind variant `dark:x` does not work.

In order for it to work inside `module.css` files you must leverage to `:global`, example:

```css
:global(.dark) .title {
  @apply text-white;
}
```

#### Husky

If pre-commit hooks are not working be sure that you have installed husky: `husky install`.

By default this command should be triggered after yarn/npm deps are installed.

## Why

I have created several NextJs webs recently. Setting the configs up is kinda the bottleneck for me to make the ideas simply come true within a very short time.

So I made this starter template for myself to create apps more easily, along with some good practices that I have learned from making those apps. Feel free to tweak it or even maintains your own forks.
