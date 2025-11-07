import 'package:flutter/material.dart';
import '../models/food_detail.dart';
import '../services/api_service.dart';
import '../widgets/loading_widget.dart';
import '../widgets/error_widget.dart';

class FoodDetailScreen extends StatefulWidget {
  final int fdcId;

  const FoodDetailScreen({Key? key, required this.fdcId}) : super(key: key);

  @override
  State<FoodDetailScreen> createState() => _FoodDetailScreenState();
}

class _FoodDetailScreenState extends State<FoodDetailScreen> {
  final ApiService _apiService = ApiService();

  FoodDetail? _foodDetail;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadFoodDetail();
  }

  Future<void> _loadFoodDetail() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final detail = await _apiService.getFoodDetail(widget.fdcId);
      setState(() {
        _foodDetail = detail;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        title: const Text('Food Details'),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const LoadingWidget(message: 'Loading food details...');
    }

    if (_error != null) {
      return ErrorDisplayWidget(message: _error!, onRetry: _loadFoodDetail);
    }

    if (_foodDetail == null) {
      return const Center(child: Text('No data available'));
    }

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Card(
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Text(
                  _foodDetail!.description,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),

                // Meta info
                Wrap(
                  spacing: 12,
                  runSpacing: 8,
                  children: [
                    if (_foodDetail!.brandOwner != null)
                      Text(
                        '🏷️ ${_foodDetail!.brandOwner}',
                        style: const TextStyle(fontSize: 16),
                      ),
                    if (_foodDetail!.dataType != null)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.blue[50],
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          _foodDetail!.dataType!,
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Colors.blue[700],
                          ),
                        ),
                      ),
                  ],
                ),

                const SizedBox(height: 24),
                const Divider(),
                const SizedBox(height: 16),

                // Nutrients section
                const Text(
                  'Key Nutrients (per 100g)',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),

                // Nutrients table
                _buildNutrientsTable(),

                const SizedBox(height: 24),
                const Divider(),
                const SizedBox(height: 16),

                // Footer
                Center(
                  child: Text(
                    'Data Source: USDA FoodData Central (ID: ${_foodDetail!.fdcId})',
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNutrientsTable() {
    final nutrients = _foodDetail!.nutrients;

    final rows = [
      {
        'name': 'Calories',
        'value': nutrients.formatNutrient(nutrients.calories, 'kcal'),
      },
      {
        'name': 'Protein',
        'value': nutrients.formatNutrient(nutrients.protein, 'g'),
      },
      {
        'name': 'Carbohydrates',
        'value': nutrients.formatNutrient(nutrients.carbs, 'g'),
      },
      {'name': 'Fat', 'value': nutrients.formatNutrient(nutrients.fat, 'g')},
      {
        'name': 'Fiber',
        'value': nutrients.formatNutrient(nutrients.fiber, 'g'),
      },
    ];

    return Table(
      border: TableBorder.all(color: Colors.grey[300]!),
      children: [
        // Header row
        TableRow(
          decoration: const BoxDecoration(color: Colors.blue),
          children: const [
            Padding(
              padding: EdgeInsets.all(12),
              child: Text(
                'Nutrient',
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                  color: Colors.white,
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(12),
              child: Text(
                'Amount',
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                  color: Colors.white,
                ),
                textAlign: TextAlign.right,
              ),
            ),
          ],
        ),
        // Data rows
        ...rows.asMap().entries.map((entry) {
          final index = entry.key;
          final row = entry.value;

          return TableRow(
            decoration: BoxDecoration(
              color: index % 2 == 0 ? Colors.grey[50] : Colors.white,
            ),
            children: [
              Padding(
                padding: const EdgeInsets.all(12),
                child: Text(
                  row['name']!,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(12),
                child: Text(
                  row['value']!,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                  textAlign: TextAlign.right,
                ),
              ),
            ],
          );
        }).toList(),
      ],
    );
  }
}
