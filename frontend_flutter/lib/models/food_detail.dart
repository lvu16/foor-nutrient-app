class Nutrients {
  final double? calories;
  final double? protein;
  final double? carbs;
  final double? fat;
  final double? fiber;

  Nutrients({this.calories, this.protein, this.carbs, this.fat, this.fiber});

  factory Nutrients.fromJson(Map<String, dynamic> json) {
    return Nutrients(
      calories: json['calories']?.toDouble(),
      protein: json['protein']?.toDouble(),
      carbs: json['carbs']?.toDouble(),
      fat: json['fat']?.toDouble(),
      fiber: json['fiber']?.toDouble(),
    );
  }

  String formatNutrient(double? value, String unit) {
    if (value == null) return 'N/A';
    return '${value.toStringAsFixed(2)} $unit';
  }
}

class FoodDetail {
  final int fdcId;
  final String description;
  final Nutrients nutrients;
  final String? dataType;
  final String? brandOwner;

  FoodDetail({
    required this.fdcId,
    required this.description,
    required this.nutrients,
    this.dataType,
    this.brandOwner,
  });

  factory FoodDetail.fromJson(Map<String, dynamic> json) {
    return FoodDetail(
      fdcId: json['fdcId'] as int,
      description: json['description'] as String,
      nutrients: Nutrients.fromJson(json['nutrients'] as Map<String, dynamic>),
      dataType: json['dataType'] as String?,
      brandOwner: json['brandOwner'] as String?,
    );
  }
}
