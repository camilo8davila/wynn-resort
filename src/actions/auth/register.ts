'use server'
import bcrypt from 'bcryptjs';

import { Gender, PrismaClient, User } from '@/generated/prisma';
import { UserRegisterForm } from '@/store';


const prisma = new PrismaClient();

export const createUser = async (userFront: UserRegisterForm) => {
  try {
    const dataToSave = {
      firstName: userFront.firstName,
      lastName: userFront.lastName,
      gender: userFront.gender as Gender,
      country: userFront.country,
      email: userFront.email,
      countryCode: userFront.phone.country,
      countryNumber: userFront.phone.number,
      countryIndicator: userFront.phone.indicator,
      terms: true,
      sendTo: userFront.sendTo!,
      password: bcrypt.hashSync('123456')
    }
    const user = await prisma.user.create({
      data: {
        ...dataToSave
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        countryCode: true,
        countryNumber: true,
        countryIndicator: true,
      }
    })
    return {
      ok: true,
      message: '',
      user
    }
  } catch (error: any) {
    console.log(error.message);

    switch (error.code) {
      case 'P2002':
        error.message = 'Email already exist'
        break;

      default:
        error.message = 'Error creating user'
        break;
    }
    throw error
  }
}