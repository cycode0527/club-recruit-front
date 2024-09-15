import ky from 'ky';
import { user, userReset, parseToken } from '$lib/stores/user';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { error } from '@sveltejs/kit';

// export const api_root = import.meta.env.VITE_API_ROOT;
export const api_root = '/api';

const api = ky.extend({
  prefixUrl: api_root,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = get(user).token;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        // token 过期, 刷新用户信息
        if (response.status === 401) {
          userReset();
          error(401, "您尚未登陆，或登陆已过期！");
        }
        
        // 更新token
        const token = response.headers.get('Set-Token');
        // console.log('token', response.headers);
        if (token) {
          // user.update(value => {
          //   value.token = token;
          //   // console.log('token updated', token);
          //   return value;
          // })
          parseToken(token);
        }
      }
    ],
  }

});

export default api;