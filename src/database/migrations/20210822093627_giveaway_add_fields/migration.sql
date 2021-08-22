/*
  Warnings:

  - You are about to drop the column `winners` on the `Giveaway` table. All the data in the column will be lost.
  - Added the required column `channel` to the `Giveaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Giveaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOngoing` to the `Giveaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfWinners` to the `Giveaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Giveaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Giveaway` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Giveaway" DROP COLUMN "winners",
ADD COLUMN     "channel" TEXT NOT NULL,
ADD COLUMN     "guildId" TEXT NOT NULL,
ADD COLUMN     "isOngoing" BOOLEAN NOT NULL,
ADD COLUMN     "numberOfWinners" INTEGER NOT NULL,
ADD COLUMN     "period" TEXT NOT NULL,
ADD COLUMN     "requirements" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "GiveawayParticipants" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageCount" INTEGER NOT NULL,
    "flag" INTEGER NOT NULL,
    "giveawayId" TEXT NOT NULL,
    "guildMemberId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Giveaway" ADD FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiveawayParticipants" ADD FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiveawayParticipants" ADD FOREIGN KEY ("guildMemberId") REFERENCES "GuildMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
