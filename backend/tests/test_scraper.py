import pytest
from app.scraper import scrape_website, is_valid_url

def test_valid_url():
    """Test URL validation"""
    valid_urls = [
        "https://example.com",
        "http://test.com/product",
        "https://sub.domain.com/path?query=1"
    ]
    invalid_urls = [
        "not_a_url",
        "ftp://invalid.com",
        "http:/missing-slash.com"
    ]
    
    for url in valid_urls:
        assert is_valid_url(url) is True
        
    for url in invalid_urls:
        assert is_valid_url(url) is False

def test_scrape_website():
    """Test website scraping"""
    test_url = "https://hyp.io/"
    content = scrape_website(test_url)
    
    assert content is not None
    assert isinstance(content, str)
    assert len(content) > 0

def test_scrape_invalid_website():
    """Test scraping an invalid website"""
    with pytest.raises(Exception):
        scrape_website("https://this-should-not-exist-123.com")
