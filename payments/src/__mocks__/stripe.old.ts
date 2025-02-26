export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}),
    list: jest.fn().mockResolvedValue({
      data: [
        {
          id: "ch_123",
          amount: 2000,
          currency: "usd",
        },
      ],
    }),
  },
};
