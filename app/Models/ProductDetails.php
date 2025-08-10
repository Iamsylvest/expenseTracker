<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetails extends Model
{
    use HasFactory;


protected $fillable = [
    'expenses_tracker_id', 'product_name', 'unit', 'quantity', 'price', 'category', 
];

public function expensesTracker () {
        return $this->belongsTo(ExpensesTracker::class);
}

}
