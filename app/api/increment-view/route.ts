import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body?.id;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    // Attempt atomic DB-side increment via RPC (requires the function to exist in Supabase).
    // Run this once in the Supabase SQL editor to create it:
    //   CREATE OR REPLACE FUNCTION increment_view_count(video_id uuid)
    //   RETURNS void AS $$
    //     UPDATE videos SET view_count = view_count + 1 WHERE id = video_id;
    //   $$ LANGUAGE sql;
    const { error: rpcError } = await supabaseAdmin.rpc('increment_view_count', { video_id: id });

    if (rpcError) {
      // Fallback: read-then-write (not atomic, but better than nothing if RPC is absent)
      const { data } = await supabaseAdmin
        .from('videos')
        .select('view_count')
        .eq('id', id)
        .single();
      await supabaseAdmin
        .from('videos')
        .update({ view_count: (data?.view_count ?? 0) + 1 })
        .eq('id', id);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
