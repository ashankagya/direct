import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dateId, inviteeId } = body;

    const dateContract = await prisma.dateContract.findUnique({
      where: { id: dateId },
    });

    if (!dateContract || dateContract.inviteeId !== inviteeId) {
      return NextResponse.json({ success: false, error: 'Date not found or unauthorized' }, { status: 404 });
    }

    if (dateContract.status !== 'PROPOSED') {
      return NextResponse.json({ success: false, error: 'Date is not in PROPOSED state' }, { status: 400 });
    }

    const updatedDate = await prisma.dateContract.update({
      where: { id: dateId },
      data: { status: 'ACCEPTED' },
    });

    return NextResponse.json({ success: true, dateContract: updatedDate });
  } catch (error) {
    console.error('Error accepting date:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
