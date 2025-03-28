// This file is auto-generated by @hey-api/openapi-ts

export type AddressFeature = {
    type?: (string | null);
    geometry?: (AddressGeometry | null);
    properties?: (AddressProperties | null);
};

export type AddressGeometry = {
    type?: (string | null);
    coordinates: Array<(number)>;
};

export type AddressProperties = {
    label?: (string | null);
    score?: (number | null);
    id?: (string | null);
    name?: (string | null);
    postcode?: (string | null);
    citycode?: (string | null);
    x?: (number | null);
    y?: (number | null);
    city?: (string | null);
    context?: (string | null);
    type?: (string | null);
    importance?: (number | null);
    banId?: (string | null);
    oldcitycode?: (string | null);
    oldcity?: (string | null);
};

export type AddressResponse = {
    type?: (string | null);
    version?: (string | null);
    features?: (Array<AddressFeature> | null);
    attribution?: (string | null);
    licence?: (string | null);
    query?: (string | null);
    limit?: (number | null);
};

export type Body_login_login_access_token = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
};

export type DropOffPointCreate = {
    title: string;
    description?: (string | null);
    address?: (string | null);
    latitude?: (number | null);
    longitude?: (number | null);
    responsible_id?: (string | null);
};

export type DropOffPointPublic = {
    title: string;
    description?: (string | null);
    address?: (string | null);
    latitude?: (number | null);
    longitude?: (number | null);
    responsible_id?: (string | null);
    id: string;
    owner_id: string;
    owner_full_name?: (string | null);
};

export type DropOffPointsPublic = {
    data: Array<DropOffPointPublic>;
    count: number;
};

export type DropOffPointUpdate = {
    title?: (string | null);
    description?: (string | null);
    address?: (string | null);
    latitude?: (number | null);
    longitude?: (number | null);
    responsible_id?: (string | null);
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type MemberInfo = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_organization?: boolean;
    full_name?: (string | null);
    id: string;
    is_pending: boolean;
};

export type MembersResponse = {
    data: Array<MemberInfo>;
    count: number;
};

export type Message = {
    message: string;
};

export type NewPassword = {
    token: string;
    new_password: string;
};

export type OrganizationMembershipResponse = {
    id: string;
    organization_id: string;
    email: string;
    member_id: string;
    is_pending: boolean;
    organization_name?: (string | null);
};

export type OrganizationMembershipsResponse = {
    data: Array<OrganizationMembershipResponse>;
    count: number;
};

export type PrivateUserCreate = {
    email: string;
    password: string;
    full_name: string;
    is_verified?: boolean;
};

export type Token = {
    access_token: string;
    token_type?: string;
};

export type UpdatePassword = {
    current_password: string;
    new_password: string;
};

export type UserCreate = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_organization?: boolean;
    full_name?: (string | null);
    password: string;
};

export type UserPublic = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_organization?: boolean;
    full_name?: (string | null);
    id: string;
};

export type UserRegister = {
    email: string;
    password: string;
    full_name?: (string | null);
};

export type UsersPublic = {
    data: Array<UserPublic>;
    count: number;
};

export type UserUpdate = {
    email?: (string | null);
    is_active?: boolean;
    is_superuser?: boolean;
    is_organization?: boolean;
    full_name?: (string | null);
    password?: (string | null);
};

export type UserUpdateMe = {
    full_name?: (string | null);
    email?: (string | null);
    is_organization?: (boolean | null);
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type AddressSearchAddressData = {
    query: string;
};

export type AddressSearchAddressResponse = (AddressResponse);

export type DropOffPointsReadDropOffPointsData = {
    limit?: number;
    skip?: number;
    usePagination?: boolean;
};

export type DropOffPointsReadDropOffPointsResponse = (DropOffPointsPublic);

export type DropOffPointsCreateDropOffPointData = {
    requestBody: DropOffPointCreate;
};

export type DropOffPointsCreateDropOffPointResponse = (DropOffPointPublic);

export type DropOffPointsReadDropOffPointData = {
    id: string;
};

export type DropOffPointsReadDropOffPointResponse = (DropOffPointPublic);

export type DropOffPointsUpdateDropOffPointData = {
    id: string;
    requestBody: DropOffPointUpdate;
};

export type DropOffPointsUpdateDropOffPointResponse = (DropOffPointPublic);

export type DropOffPointsDeleteDropOffPointData = {
    id: string;
};

export type DropOffPointsDeleteDropOffPointResponse = (Message);

export type LoginLoginAccessTokenData = {
    formData: Body_login_login_access_token;
};

export type LoginLoginAccessTokenResponse = (Token);

export type LoginTestTokenResponse = (UserPublic);

export type LoginRecoverPasswordData = {
    email: string;
};

export type LoginRecoverPasswordResponse = (Message);

export type LoginResetPasswordData = {
    requestBody: NewPassword;
};

export type LoginResetPasswordResponse = (Message);

export type LoginRecoverPasswordHtmlContentData = {
    email: string;
};

export type LoginRecoverPasswordHtmlContentResponse = (string);

export type MembersGetOrganizationsResponse = (OrganizationMembershipsResponse);

export type MembersAcceptInvitationData = {
    invitationId: string;
};

export type MembersAcceptInvitationResponse = (boolean);

export type MembersDeleteOrganizationData = {
    memberId: string;
};

export type MembersDeleteOrganizationResponse = (boolean);

export type OrganizationsInviteUserToOrganizationData = {
    email: string;
};

export type OrganizationsInviteUserToOrganizationResponse = (boolean);

export type OrganizationsGetMembersResponse = (MembersResponse);

export type OrganizationsDeleteMemberData = {
    memberId: string;
};

export type OrganizationsDeleteMemberResponse = (boolean);

export type PrivateCreateUserData = {
    requestBody: PrivateUserCreate;
};

export type PrivateCreateUserResponse = (UserPublic);

export type UsersReadUsersData = {
    limit?: number;
    skip?: number;
};

export type UsersReadUsersResponse = (UsersPublic);

export type UsersCreateUserData = {
    requestBody: UserCreate;
};

export type UsersCreateUserResponse = (UserPublic);

export type UsersReadUserMeResponse = (UserPublic);

export type UsersDeleteUserMeResponse = (Message);

export type UsersUpdateUserMeData = {
    requestBody: UserUpdateMe;
};

export type UsersUpdateUserMeResponse = (UserPublic);

export type UsersUpdatePasswordMeData = {
    requestBody: UpdatePassword;
};

export type UsersUpdatePasswordMeResponse = (Message);

export type UsersRegisterUserData = {
    requestBody: UserRegister;
};

export type UsersRegisterUserResponse = (UserPublic);

export type UsersReadUserByIdData = {
    userId: string;
};

export type UsersReadUserByIdResponse = (UserPublic);

export type UsersUpdateUserData = {
    requestBody: UserUpdate;
    userId: string;
};

export type UsersUpdateUserResponse = (UserPublic);

export type UsersDeleteUserData = {
    userId: string;
};

export type UsersDeleteUserResponse = (Message);

export type UtilsTestEmailData = {
    emailTo: string;
};

export type UtilsTestEmailResponse = (Message);

export type UtilsHealthCheckResponse = (boolean);