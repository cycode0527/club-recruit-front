import daisyui from 'daisyui';
import { addDynamicIconSelectors } from '@iconify/tailwind';
// const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'hsl(209, 100%, 70%)',
        'primary-blue-light': 'hsl(209, 100%, 75%)',
        'primary-blue-dark': 'hsl(209, 100%, 60%)',
        'primary-blue-disabled': 'hsl(209, 100%, 80%)',
        
        'primary-red': 'hsl(0, 97%, 72%)',
        'primary-red-light': 'hsl(0, 97%, 77%)',
        'primary-red-dark': 'hsl(0, 97%, 62%)',
        'primary-red-disabled': 'hsl(0, 97%, 82%)',
        
        'primary-background': '#F4F6FF',

        'primary-content': 'hsl(226,25%,90%)',
        'primary-content-dark': 'hsl(226,25%,80%)',
        // 'primary-blue': {}
      }
    },
    fontFamily: {
      sans: [
        '"JetBrains Mono"',
        'Menlo',
        '-apple-system',
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Helvetica',
        '"Nimbus Sans L"',
        'Arial',
        '"Liberation Sans"',
        '"PingFang SC"',
        '"Hiragino Sans GB"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        '"Source Han Sans CN"',
        '"Microsoft YaHei"',
        'Consolas',
        'Courier',
        'monospace',
      ],
      serif: [
        '"JetBrains Mono"',
        'Menlo',
        '-apple-system',
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Helvetica',
        '"Nimbus Sans L"',
        'Arial',
        '"Liberation Sans"',
        '"PingFang SC"',
        '"Hiragino Sans GB"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        '"Source Han Sans CN"',
        '"Microsoft YaHei"',
        'Consolas',
        'Courier',
        'monospace',
      ],
      mono: [
        '"JetBrains Mono"',
        'Menlo',
        '-apple-system',
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Helvetica',
        '"Nimbus Sans L"',
        'Arial',
        '"Liberation Sans"',
        '"PingFang SC"',
        '"Hiragino Sans GB"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        '"Source Han Sans CN"',
        '"Microsoft YaHei"',
        'Consolas',
        'Courier',
        'monospace',
      ],
      display: [
        '"JetBrains Mono"',
        'Menlo',
        '-apple-system',
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Helvetica',
        '"Nimbus Sans L"',
        'Arial',
        '"Liberation Sans"',
        '"PingFang SC"',
        '"Hiragino Sans GB"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        '"Source Han Sans CN"',
        '"Microsoft YaHei"',
        'Consolas',
        'Courier',
        'monospace',
      ],
      body: [
        '"JetBrains Mono"',
        'Menlo',
        '-apple-system',
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Helvetica',
        '"Nimbus Sans L"',
        'Arial',
        '"Liberation Sans"',
        '"PingFang SC"',
        '"Hiragino Sans GB"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        '"Source Han Sans CN"',
        '"Microsoft YaHei"',
        'Consolas',
        'Courier',
        'monospace',
      ],

    }

  },
  plugins: [
    daisyui, addDynamicIconSelectors(),
  ],
  
  daisyui: {
    themes: false,
    styled: true,
    darkTheme: "light",
    

    
    base: true,
    utils: true,
    logs: false,
    rtl: false,

  },
};