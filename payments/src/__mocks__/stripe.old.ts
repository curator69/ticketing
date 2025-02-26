export const stripe = {
  checkout: {
    sessions: {
      create: jest.fn().mockResolvedValue({ id: "cs_123" }),
    },
  },
};
