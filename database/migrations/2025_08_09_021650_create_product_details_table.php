<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('expenses_tracker_id');
            $table->string('product_name');
            $table->string('unit');
            $table->integer('quantity');
            $table->integer('price');
            $table->string('category');
            $table->timestamps();



            $table->foreign('expenses_tracker_id')->references('id')->on('expenses_tracker')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_details');
    }
};
