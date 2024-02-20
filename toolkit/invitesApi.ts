import { retry } from "@reduxjs/toolkit/query/react";
import api from "./api";
import { Invite } from "../types/Invite";

type InvitesResponse = Invite[];

export const invitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    addInvite: build.mutation<Invite, Partial<Invite>>({
      query: (body) => ({
        url: `invites/create/${body?.id}`,
        method: "POST",
        body,
      }),

      transformResponse: (response: { data: Invite }, meta, arg) =>
        response.data,
      invalidatesTags: ["Invites"],
    }),
    getInvites: build.query<Invite[], string>({
      query: (id) => ({ url: `invites/mine/${id}` }),
      transformResponse: (response: { data: Invite[] }, meta, arg) =>
        response.data,
      providesTags: (_Invite, _err, id) => [{ type: "Invites", id }],
    }),
  }),
  overrideExisting: true,
});

export const { useAddInviteMutation, useGetInvitesQuery } = invitesApi;
