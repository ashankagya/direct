import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DateStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dateId, userId, latitude, longitude } = body;

    const dateContract = await prisma.dateContract.findUnique({
      where: { id: dateId },
      include: { venue: true },
    });

    if (!dateContract) {
      return NextResponse.json({ success: false, error: 'Date not found' }, { status: 404 });
    }

    if (dateContract.status !== 'ACTIVE' && dateContract.status !== 'ACCEPTED') {
      return NextResponse.json({ success: false, error: 'Date is not ACTIVE or ACCEPTED' }, { status: 400 });
    }

    // Very basic location validation mock
    // In a real app, calculate distance between venue.latitude/longitude and latitude/longitude
    const isAtVenue = true; // Mock: Assume user is at the venue

    if (!isAtVenue) {
      return NextResponse.json({ success: false, error: 'Not at the venue' }, { status: 400 });
    }

    let proposerCheckedIn = dateContract.proposerCheckedIn;
    let inviteeCheckedIn = dateContract.inviteeCheckedIn;

    if (userId === dateContract.proposerId) proposerCheckedIn = true;
    else if (userId === dateContract.inviteeId) inviteeCheckedIn = true;
    else return NextResponse.json({ success: false, error: 'User not part of this date' }, { status: 403 });

    let newStatus: DateStatus = dateContract.status;
    if (proposerCheckedIn && inviteeCheckedIn) {
      newStatus = 'COMPLETED';
    } else if (proposerCheckedIn || inviteeCheckedIn) {
      newStatus = 'CHECKED_IN';
    }

    const updatedDate = await prisma.dateContract.update({
      where: { id: dateId },
      data: {
        proposerCheckedIn,
        inviteeCheckedIn,
        status: newStatus,
      },
    });

    return NextResponse.json({ success: true, dateContract: updatedDate });
  } catch (error) {
    console.error('Error checking in:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
