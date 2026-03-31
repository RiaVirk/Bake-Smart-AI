import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Temporary: use first tenant (we replace this in Week 8 with real user-tenant link)
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    return NextResponse.json({ error: 'No tenant found' }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { tenantId: tenant.id },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(products);
}