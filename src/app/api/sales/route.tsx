import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    return NextResponse.json({ error: 'No tenant found. Run seed first.' }, { status: 400 });
  }

  const sales = await prisma.sale.findMany({
    where: { tenantId: tenant.id },
    include: { product: true },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(sales);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    return NextResponse.json({ error: 'No tenant found' }, { status: 400 });
  }

  const body = await request.json();
  const { productId, quantity, date } = body;

  if (!productId || !quantity || !date) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const sale = await prisma.sale.create({
    data: {
      productId,
      quantity: Number(quantity),
      date: new Date(date),
      tenantId: tenant.id,
    },
    include: { product: true },
  });

  return NextResponse.json(sale);
}
