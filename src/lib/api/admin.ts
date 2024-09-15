import api from ".";

// =================================================================================

export interface GetUserInfoRequest {
    method: string;
    query: string;
}

/** 用户的信息 */
export interface GetUserInfo {
    id: number;
    email_address: string;
    nick_name: string;
    student_major: string;
    real_name: string;
    user_group: number;
    gender: number;
    student_id: string;
    is_postgraduate: boolean;
    qq_uid: string;
    phone_id: string;
    status: string;
    want_direction: number;
    student_grade: number;
    self_introduce: string;
}

/** 获取某个用户的详细信息响应 */
export interface GetUserInfoResponse {
    code: number;
    message: string;
    length: number;
    data: [
        {
            id: number;
            email_address: string;
            nick_name: string;
            student_major: string;
            real_name: string;
            user_group: number;
            gender: number;
            student_id: string;
            is_postgraduate: boolean;
            qq_uid: string;
            phone_id: string;
            status: string;
            want_direction: number;
            student_grade: number;
            self_introduce: string;
        }
    ]
}




/**
 * 查询用户详细信息
 * @param id 用户 id 
 * @returns 
 */
export async function getUserInfo(id: string) {
    let req: GetUserInfoRequest = {
        method: "id",
        query: id,
    };
    let response: GetUserInfoResponse = await api.post('admin/getUserInfo', {
        json: req,
    }).json();
    
    // 挑选第一个， 也本应只有一个
    let user: GetUserInfo = response.data[0];
    return user;
}


// =================================================================================

export interface ListRequest {
    only_applied_users: boolean;
    no_super_users: boolean;
    status: string | null;
    want_direction: number | null;   
    vague_real_name: string | null;
    limit: number;
    offset: number;
}

export interface ListUserInfo {
    id: number;
    email_address: string;
    nick_name: string;
    real_name: string;
    user_group: string;
    sex: string;
    student_id: string;
    is_postgraduate: boolean;
    qq: string;
    phone: string;
    status: string;
    want_direction: number;
}

export interface ListResponse {
    code: number;
    message: string;
    length: number;
    total: number;
    data: [
        {
            id: number;
            email_address: string;
            nick_name: string;
            real_name: string;
            user_group: string;
            sex: string;
            student_id: string;
            is_postgraduate: boolean;
            qq: string;
            phone: string;
            status: string;
            want_direction: number;
        }
    ]
}

/**
 * 获取用户列表
 */
export async function listUsers(request: ListRequest): Promise<ListResponse> {
    return await api.post('admin/list', {
        json: request,
    }).json();
    
}

// =================================================================================


export interface ListCommentRequest {
    nick_name: string;
}


/**
 * 列出的评论
 */
export interface ListComment {
    id: number;
    operator: string;
    target: string;
    message: string;
    inserted_at: number;
}

export interface ListCommentResponse {
    code: number;
    message: string;
    length: number;
    data: ListComment[];
        // {
        //     id: number;
        //     operator: string;
        //     target: string;
        //     message: string;
        //     inserted_at: number;
        // }
    // ]
}

export async function listComment(nick_name: string): Promise<ListCommentResponse> {
    return await api.post('admin/listComment', {
        json: {
            nick_name,
        },
    }).json();
}

// =================================================================================


export interface UpdateStatusRequest {
    user_id: number;
    new_status: string;
}

export interface UpdateStatusResponse {
    code: number;
    message: string;
    new_status: string;
}

/**
 * 更新某 id 用户状态
 * @param request 
 * @returns 
 */
export async function updateStatus(request: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    return api.post('admin/updateStatus', {
        json: request,
    }).json();
}


// =================================================================================

export interface AddCommentRequest {
    nick_name: string;
    comment: string;
}

export interface AddCommentResponse {
    code: number;
    message: string;
}

/**
 * 给某用户添加评论
 * @param request 
 * @returns 
 */
export async function addComment(request: AddCommentRequest): Promise<AddCommentResponse> {
    return api.post('admin/addComment', {
        json: request,
    }).json();
}

