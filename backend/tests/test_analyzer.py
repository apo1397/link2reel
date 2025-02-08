import pytest
from app.analyzer import ContentAnalyzer

@pytest.fixture
def sample_content():
    return """
    Our revolutionary AI-powered blender features:
    1. Smart recipe suggestions based on ingredients
    2. Voice control capabilities
    3. Self-cleaning technology
    4. 10 variable speeds
    5. Dishwasher safe components
    """

def test_analyze_content(analyzer, sample_content):
    """Test USP analysis"""
    usps = analyzer.analyze(sample_content)
    
    assert usps is not None
    assert isinstance(usps, list)
    assert len(usps) == 3  # Should return exactly 3 USPs
    
    for usp in usps:
        assert isinstance(usp, str)
        assert len(usp) > 0

def test_generate_script(analyzer):
    """Test script generation"""
    test_url = "https://example.com"
    test_usps = [
        "AI-powered recipe suggestions",
        "Voice control capabilities",
        "Self-cleaning technology"
    ]
    
    script = analyzer.generate_script(test_url, test_usps)
    
    assert script is not None
    assert isinstance(script, str)
    assert len(script) > 0
    assert test_url in script  # Script should include the URL
