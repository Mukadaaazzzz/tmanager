// app/api/waitlist/route.tsx
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Type for the expected request body
interface WaitlistRequest {
  email: string;
}

// Create Supabase client with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // Parse and type-check the request body
    const { email }: WaitlistRequest = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      return NextResponse.json(
        { 
          error: error.code === '23505' 
            ? 'This email is already on our waitlist!' 
            : 'Failed to join waitlist' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}