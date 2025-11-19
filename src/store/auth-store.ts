import { create } from "zustand"

import {
  authTokenSchema,
  type AuthTokens,
  type UserProfile,
  userProfileSchema,
} from "@/lib/schemas/auth"

type AuthState = {
  profile: UserProfile | null
  tokens: AuthTokens | null
  pendingEmail: string | null
  setAuthSession: (profile: UserProfile, tokens?: AuthTokens | null) => void
  updateProfile: (payload: Partial<UserProfile>) => void
  setPendingEmail: (email: string | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  tokens: null,
  pendingEmail: null,
  setAuthSession: (profile, tokens = null) =>
    set(() => ({
      profile: userProfileSchema.parse(profile),
      tokens: tokens ? authTokenSchema.parse(tokens) : null,
    })),
  updateProfile: (payload) =>
    set((state) => {
      const nextProfile = { ...(state.profile ?? {}), ...payload }
      if (!nextProfile.email) {
        return { profile: state.profile }
      }

      return { profile: userProfileSchema.parse(nextProfile) }
    }),
  setPendingEmail: (email) => set({ pendingEmail: email }),
  clearAuth: () => set({ profile: null, tokens: null, pendingEmail: null }),
}))
