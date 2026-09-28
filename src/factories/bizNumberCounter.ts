import { BizNumberCounterModel } from "../db/models/bizNumberCounter";

export async function reserveAndGetSingleBizNumber(): Promise<number> {
  const result = await BizNumberCounterModel.findOneAndUpdate(
    { _id: "cardBizNumber" },
    { $inc: { bizNumber: 1 } },
    { returnDocument: "after", upsert: true }
  );

  if (!result) {
    throw new Error("Failed to generate bizNumber");
  }

  return result.bizNumber;
}

export async function reserveAndGetBulkBizNumbers(wantToReserve: number): Promise<{ firstReserved: number }> {
  const result = await BizNumberCounterModel.findOneAndUpdate(
    { _id: "cardBizNumber" },
    { $inc: { bizNumber: wantToReserve } },
    { returnDocument: "after", upsert: true }
  );

  if (!result) {
    throw new Error("Failed to generate N bizNumbers");
  }

  return { firstReserved: result.bizNumber - wantToReserve + 1 };
}
