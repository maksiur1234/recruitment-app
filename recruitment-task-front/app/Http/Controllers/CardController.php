<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::paginate(2);
        return response()->json($cards);
    }

    public function store(StoreCardRequest $request)
    {
        $validatedData = $request->validated();

        $card = Card::create($validatedData);

        return response()->json($card);
    }

    public function show($id)
    {
        $card = Card::findOrFail($id);

        return response()->json($card);
    }

    public function update(UpdateCardRequest $request, $id)
    {
        $validatedData = $request->validated();

        $card = Card::findOrFail($id);
        $card->update($validatedData);

        return response()->json($card);
    }

    public function destroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json(['message' => 'Card deleted sucessfully.']);
    }
}
