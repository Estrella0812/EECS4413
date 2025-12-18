package com.eecs.pcshop.repository.specification;

import com.eecs.pcshop.dto.ProductSearchCriteria;
import com.eecs.pcshop.model.Product;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> buildQuery(ProductSearchCriteria searchCriteria) {

        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("category"), searchCriteria.getCategory()));

            if (query != null && query.getResultType() != Long.class) {
                // an optimization
                root.fetch("images", JoinType.LEFT);
            }

            String searchQuery = searchCriteria.getQuery();
            if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                String[] keywords = searchQuery.toLowerCase().split("\\s+");
                for (String keyword : keywords) {
                    String pattern = "%" + keyword + "%";
                    predicates.add(cb.or(
                            cb.like(cb.lower(root.get("name")), pattern),
                            cb.like(cb.lower(root.get("description")), pattern)
                    ));
                }
            }

            if (searchCriteria.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), searchCriteria.getMinPrice()));
            }
            if (searchCriteria.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), searchCriteria.getMaxPrice()));
            }
            if (searchCriteria.getInStock() != null) {
                predicates.add(searchCriteria.getInStock()
                        ? cb.greaterThan(root.get("stock"), 0)
                        : cb.equal(root.get("stock"), 0));
            }
            if (searchCriteria.getBrands() != null) {
                predicates.add(cb.or(Arrays.stream(searchCriteria.getBrands())
                        .map(brand -> cb.equal(root.get("brand"), brand))
                        .toArray(Predicate[]::new)
                ));
            }

            return cb.and(predicates.toArray(Predicate[]::new));
        };
    }
}
