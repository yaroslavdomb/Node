import { BizNumberCounterModel } from "../db/models/bizNumberCounter.js";

/*
 * wantToReserve = Argument, how many numbers to reserve
 * firstReserved = Returned, first number in seria that was reserved
 *
 * This function allows reservation of N numbers in consequence.
 * After rteservation, the counter in DB will hold the LAST reserved number.
 * Calculations will allow you to get the FIRST reserved number
 * and pass through all the series knowing how many WAS reserved (wantToReserve)
 *
 */
export async function reserveAndGetBizNumbers(wantToReserve: number): Promise<{ firstReserved: number }> {
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
