// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"
import type {
  DropOffPointsReadItemsData,
  DropOffPointsReadItemsResponse,
  DropOffPointsCreateItemData,
  DropOffPointsCreateItemResponse,
  DropOffPointsReadItemData,
  DropOffPointsReadItemResponse,
  DropOffPointsUpdateItemData,
  DropOffPointsUpdateItemResponse,
  DropOffPointsDeleteItemData,
  DropOffPointsDeleteItemResponse,
  LoginLoginAccessTokenData,
  LoginLoginAccessTokenResponse,
  LoginTestTokenResponse,
  LoginRecoverPasswordData,
  LoginRecoverPasswordResponse,
  LoginResetPasswordData,
  LoginResetPasswordResponse,
  LoginRecoverPasswordHtmlContentData,
  LoginRecoverPasswordHtmlContentResponse,
  UsersReadUsersData,
  UsersReadUsersResponse,
  UsersCreateUserData,
  UsersCreateUserResponse,
  UsersReadUserMeResponse,
  UsersDeleteUserMeResponse,
  UsersUpdateUserMeData,
  UsersUpdateUserMeResponse,
  UsersUpdatePasswordMeData,
  UsersUpdatePasswordMeResponse,
  UsersRegisterUserData,
  UsersRegisterUserResponse,
  UsersReadUserByIdData,
  UsersReadUserByIdResponse,
  UsersUpdateUserData,
  UsersUpdateUserResponse,
  UsersDeleteUserData,
  UsersDeleteUserResponse,
  UtilsTestEmailData,
  UtilsTestEmailResponse,
  UtilsHealthCheckResponse,
  AddressGetAddressData,
} from "./types.gen"

export class DropOffPointsService {
  /**
   * Read Drop Off Points
   * Retrieve drop off points.
   * @param data The data for the request.
   * @param data.skip
   * @param data.limit
   * @returns DropOffPointsPublic Successful Response
   * @throws ApiError
   */
  public static readDropOffPoints(
    data: DropOffPointsReadItemsData = {},
  ): CancelablePromise<DropOffPointsReadItemsResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/drop-off-points/",
      query: {
        skip: data.skip,
        limit: data.limit,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Create Drop Off Point
   * Create new drop off point.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns DropOffPointPublic Successful Response
   * @throws ApiError
   */
  public static createDropOffPoint(
    data: DropOffPointsCreateItemData,
  ): CancelablePromise<DropOffPointsCreateItemResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/drop-off-points/",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Read Drop Off Point
   * Get drop off point by ID.
   * @param data The data for the request.
   * @param data.id
   * @returns DropOffPointPublic Successful Response
   * @throws ApiError
   */
  public static readDropOffPoint(
    data: DropOffPointsReadItemData,
  ): CancelablePromise<DropOffPointsReadItemResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/drop-off-points/{id}",
      path: {
        id: data.id,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Update Drop Off Point
   * Update a drop off point.
   * @param data The data for the request.
   * @param data.id
   * @param data.requestBody
   * @returns DropOffPointPublic Successful Response
   * @throws ApiError
   */
  public static updateDropOffPoint(
    data: DropOffPointsUpdateItemData,
  ): CancelablePromise<DropOffPointsUpdateItemResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/drop-off-points/{id}",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Delete Drop Off Point
   * Delete a drop off point.
   * @param data The data for the request.
   * @param data.id
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteDropOffPoint(
    data: DropOffPointsDeleteItemData,
  ): CancelablePromise<DropOffPointsDeleteItemResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/drop-off-points/{id}",
      path: {
        id: data.id,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }
}

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @param data The data for the request.
   * @param data.formData
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(
    data: LoginLoginAccessTokenData,
  ): CancelablePromise<LoginLoginAccessTokenResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/access-token",
      formData: data.formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<LoginTestTokenResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/test-token",
    })
  }

  /**
   * Recover Password
   * Password Recovery
   * @param data The data for the request.
   * @param data.email
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(
    data: LoginRecoverPasswordData,
  ): CancelablePromise<LoginRecoverPasswordResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery/{email}",
      path: {
        email: data.email,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Reset Password
   * Reset password
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(
    data: LoginResetPasswordData,
  ): CancelablePromise<LoginResetPasswordResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/reset-password/",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @param data The data for the request.
   * @param data.email
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(
    data: LoginRecoverPasswordHtmlContentData,
  ): CancelablePromise<LoginRecoverPasswordHtmlContentResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery-html-content/{email}",
      path: {
        email: data.email,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }
}

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @param data The data for the request.
   * @param data.skip
   * @param data.limit
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(
    data: UsersReadUsersData = {},
  ): CancelablePromise<UsersReadUsersResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/",
      query: {
        skip: data.skip,
        limit: data.limit,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Create User
   * Create new user.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(
    data: UsersCreateUserData,
  ): CancelablePromise<UsersCreateUserResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UsersReadUserMeResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMe(): CancelablePromise<UsersDeleteUserMeResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Update User Me
   * Update own user.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMe(
    data: UsersUpdateUserMeData,
  ): CancelablePromise<UsersUpdateUserMeResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Update Password Me
   * Update own password.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(
    data: UsersUpdatePasswordMeData,
  ): CancelablePromise<UsersUpdatePasswordMeResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me/password",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Register User
   * Create new user without the need to be logged in.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static registerUser(
    data: UsersRegisterUserData,
  ): CancelablePromise<UsersRegisterUserResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/signup",
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @param data The data for the request.
   * @param data.userId
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(
    data: UsersReadUserByIdData,
  ): CancelablePromise<UsersReadUserByIdResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: data.userId,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Update User
   * Update a user.
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUser(
    data: UsersUpdateUserData,
  ): CancelablePromise<UsersUpdateUserResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: data.userId,
      },
      body: data.requestBody,
      mediaType: "application/json",
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Delete User
   * Delete a user.
   * @param data The data for the request.
   * @param data.userId
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(
    data: UsersDeleteUserData,
  ): CancelablePromise<UsersDeleteUserResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: data.userId,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }
}

export class UtilsService {
  /**
   * Test Email
   * Test emails.
   * @param data The data for the request.
   * @param data.emailTo
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static testEmail(
    data: UtilsTestEmailData,
  ): CancelablePromise<UtilsTestEmailResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/utils/test-email/",
      query: {
        email_to: data.emailTo,
      },
      errors: {
        422: "Validation Error",
      },
    })
  }

  /**
   * Health Check
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static healthCheck(): CancelablePromise<UtilsHealthCheckResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/utils/health-check/",
    })
  }
}

export class AddressService {
  public static getAddress(
    data: AddressGetAddressData,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/address/",
      query: {
        query: data.query,
      },
    })
  }
}