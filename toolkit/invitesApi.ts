import { retry } from "@reduxjs/toolkit/query/react";
import api from "./api";

export interface Invite {
  id: number;
  name: string;
  created_at: string;
}

type InvitesResponse = Invite[];

export const invitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProperties: build.query<InvitesResponse, void>({
      query: () => ({ url: "invites" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Invite", id } as const)),
        { type: "Invite" as const, id: "LIST" }
      ]
    }),
    addInvite: build.mutation<Invite, Partial<Invite>>({
      query: (body) => ({
        url: `invites`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Invite", id: "LIST" }]
    }),
    getInvite: build.query<Invite, number>({
      query: (id) => `invites/${id}`,
      providesTags: (_Invite, _err, id) => [{ type: "Invite", id }]
    })
  }),
  overrideExisting: true
});

export const {
  useAddInviteMutation,
  useGetInviteQuery,
  useGetPropertiesQuery
} = invitesApi;
