class Food {
  final int fdcId;
  final String description;
  final String? dataType;
  final String? brandOwner;

  Food({
    required this.fdcId,
    required this.description,
    this.dataType,
    this.brandOwner,
  });

  factory Food.fromJson(Map<String, dynamic> json) {
    return Food(
      fdcId: json['fdcId'] as int,
      description: json['description'] as String,
      dataType: json['dataType'] as String?,
      brandOwner: json['brandOwner'] as String?,
    );
  }
}
