import { Injectable } from '@nestjs/common';
import { prisma } from '../database/database.service';
import { EmblemI } from 'src/entities/emblem.entitie';

@Injectable()
export class RankingService {
  public async updateUserPoints({
    id,
    emblemId,
  }: {
    id: number;
    emblemId: number;
  }): Promise<number | null> {
    try {
      const { value } = await prisma.emblem.findUnique({
        where: { id: emblemId },
      });

      const newPoints = await prisma.user.update({
        where: { id: id },
        data: {
          points: {
            increment: value,
          },
        },
      });
      return newPoints.points;
    } catch (error) {
      throw new Error(`Erro ao atualizar os pontos do usuário.`);
    }
  }
  public async getUserNotHaveEmblem({ emblems }: { emblems: EmblemI[] }) {

    const ids: number[] = emblems.map((emblem) => emblem.id) || [1];
    try {
      const emblemsNotIn = await prisma.emblem.findMany({
        where: {
          id: {
            notIn: ids,
          },
        },
      });
      if (emblemsNotIn.length === 0) {
        throw new Error('O usuário já ganhou todos os emblemas.');
      }
      return emblemsNotIn;
    } catch (error) {
      throw new Error('O usuário já ganhou todos os emblemas.');
    }
  }
  public async getRandomEmblemToUser({
    id,
    emblems,
  }: {
    id: number;
    emblems: EmblemI[];
  }) {
    try {
      const userNotHave = await this.getUserNotHaveEmblem({ emblems });
      const randomIndex = Math.floor(Math.random() * userNotHave.length);

      const emblem = await prisma.emblem.findUnique({
        where: { id: userNotHave[randomIndex].id },
      });
      await prisma.userEmblem.create({
        data: { user_id: id, emblem_id: emblem.id },
      });
      await this.updateUserPoints({ id, emblemId: emblem.id });

      return emblem;
    } catch (error: any) {
console.log(error);

      throw new Error(error.message || `Erro ao presentear usuário.`);
    }
  }
}
