import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proposerId, inviteeId, venueId, scheduledAt } = body;

    const dateContract = await prisma.dateContract.create({
      data: {
        proposerId,
        inviteeId,
        venueId,
        scheduledAt: new Date(scheduledAt),
        status: 'PROPOSED',
      },
    });

    return NextResponse.json({ success: true, dateContract }, { status: 201 });
  } catch (error) {
    console.error('Error proposing date:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
